<template>
  <div class="viewing-room-container">
    <VideoPlayer />
    <ChatArea v-if="conn" :conn="conn" />
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
      conns: '',
      peer: {},
      userIds: [''],
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
        this.conn = conn;
        console.log('connected');
        conn.on('data', data => {
          console.log(data);
          this.userIds.push(data);
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
