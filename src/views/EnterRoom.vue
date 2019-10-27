<template>
  <div class="viewing-room-container">
    <VideoPlayer />
    <ChatArea v-if="conn" :conn="conn" />
    Potato
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
      peer: {},
      userIds: [''],
      roomId: 'host',
      messages: [],
      conn: '',
    };
  },

  mounted() {
    this.getPeerId();
    this.peerConnection();
    this.connectToHost();
  },
  methods: {
    getPeerId() {
      this.peer = this.peerId('');
    },
    peerConnection() {
      this.peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
      });
    },

    getPeers() {
      this.peer.on('connection', conn => {
        conn.on('data', data => {
          console.log(data);
          if (data.type === 'id') {
            this.userIds.push(data);
          }
          if (data.type === 'message') {
            console.log(data);
          }
        });
      });
    },

    connectToHost() {
      const conn = this.peer.connect('host');
      this.conn = conn;
      conn.on('open', () => {
        conn.send('okay');
      });
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
