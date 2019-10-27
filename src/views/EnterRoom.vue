<template>
  <div class="viewing-room-container">
    <ChatArea v-if="conns" :conns="conns" />
    <VideoPlayer />
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
      conns: [],
      userId: '',
      roomUsersId: [],
      firstConnection: true,
    };
  },

  mounted() {
    this.getPeerId();
    this.peerConnection();
  },
  methods: {
    getPeerId() {
      this.peer = this.peerId('');
      this.peer.on('open', id => {
        console.log(id);
      });
    },

    connectToHost() {
      const conn = this.peer.connect('host');
      this.conn = conn;
      this.conns.push(this.conn);
      conn.on('open', function() {});
      conn.on('data', data => {
        if (data.type === 'connections') {
          if (this.firstConnection) {
            this.roomUsersId = data.ids;
            this.firstConnection = false;
            return;
          }
          data.ids.forEach(user => {
            if (!this.roomUsersId.includes(user) && this.peer.id !== user) {
              this.roomUsersId.push(user);
              console.log('Connect to ' + user);
              const conn = this.peer.connect(user);
              conn.on('open', () => {
                this.conns.push(conn);
              });
            }
          });
        }
      });
    },

    peerConnection() {
      let peerId = '';
      this.peer.on('connection', conn => {
        this.conns.push(conn);
      });
      this.userId = peerId;
      this.connectToHost();
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
