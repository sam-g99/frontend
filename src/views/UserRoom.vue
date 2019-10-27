<template>
  <div class="viewing-room-container">
    <VideoPlayer />
    <ChatArea v-if="conns" :conns="conns" />
    <button>stream</button>
  </div>
</template>

<script>
import VideoPlayer from '@/components/video/VideoPlayer';
import ChatArea from '@/components/chat/ChatArea.vue';

export default {
  components: {
    VideoPlayer,
    ChatArea,
  },
  data: () => {
    return {
      conn: '',
      conns: [],
      peer: {},
      constraints: {
        audio: true,
        video: {
          width: { max: 1920 },
          height: { max: 1080 },
          frameRate: 25,
        },
      },
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    getPeerId() {
      this.peer = this.peerId('host');
    },

    peerConnection() {
      this.peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
      });
    },

    getPeers() {
      this.peer.on('connection', conn => {
        console.log('connected');
        this.conns.push(conn);
        conn.on('open', () => {
          const peerIds = this.conns.map(c => c.peer);
          this.conns.forEach(conn => {
            conn.send({ type: 'connections', ids: peerIds });
          });
        });
      });
    },

    start() {
      this.getPeerId();
      this.peerConnection();
      this.getPeers();
    },
  },
};
</script>

<style lang="scss" scoped>
.viewing-room-container {
  background: #1b182d !important;
  height: 100%;
}
</style>
