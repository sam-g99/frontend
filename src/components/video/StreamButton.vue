<template>
  <div>
    <button @click="getStream">Stream</button>
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
        audio: true,
        video: {
          width: { max: 1280 },
          height: { max: 720 },
          aspectRatio: 1.777777778,
          frameRate: { max: 30 },
        },
      },
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
      this.videoPlayer.muted = true;
      this.$emit('streaming', stream);
      this.conns.forEach(conn => {
        console.log('called', conn.peer);
        this.peer.call(conn.peer, stream);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
