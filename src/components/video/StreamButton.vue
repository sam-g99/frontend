<template>
  <div>
    <button v-if="!streaming" @click="getStream">Start Stream</button>
    <button v-if="streaming" class="stop" @click="closeStream">Stop Stream</button>
  </div>
</template>

<script>
export default {
  props: {
    videoPlayer: {
      type: HTMLVideoElement,
      required: true,
    },
    peer: {
      type: Object,
      required: true,
    },
    conns: {
      type: Array,
      required: true,
    },
  },
  data: () => {
    return {
      constraints: {
        audio: {
          echoCancellation: false,
          googEchoCancellation: false,
          googEchoCancellation2: false,
          googAutoGainControl: false,
          googAutoGainControl2: false,
          googNoiseSuppression: false,
          googNoiseSuppression2: false,
          googHighpassFilter: false,
          googTypingNoiseDetection: false,
        },
        video: {
          width: { max: 1280 },
          height: { max: 720 },
          aspectRatio: 1.777777778,
          frameRate: { max: 30 },
        },
      },
      calls: [],
      streaming: false,
    };
  },
  methods: {
    async getStream() {
      let stream;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(this.constraints);
      } catch (error) {
        console.log('Hey we cannot get the media sorry', error);
        return;
      }
      this.videoPlayer.srcObject = stream;
      console.log(stream.getAudioTracks());
      this.videoPlayer.muted = true;
      this.streaming = true;
      this.$emit('streaming', stream);
      this.conns.forEach(conn => {
        console.log('called', conn.peer);
        const call = this.peer.call(conn.peer, stream);
        console.log(call);
        this.calls.push(call);
      });
    },
    closeStream() {
      this.streaming = false;
      const stream = this.videoPlayer.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      this.calls.forEach(call => {
        call.close();
        console.log('call closed', call);
      });
      this.conns.forEach(conn => {
        conn.send({ type: 'streamStoppped' });
      });
      this.calls.length = 0;
      this.videoPlayer.srcObject = null;
      this.$emit('stoppedStream');
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  background: green;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 15px;
  padding: 10px;
}

.stop {
  background: red;
}
</style>
