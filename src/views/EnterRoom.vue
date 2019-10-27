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
      const id =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);

      this.peer = this.peerId('');
    },

    connectToHost() {
      const conn = this.peer.connect('host');
      this.conn = conn;
      this.conns.push(this.conn);
      conn.on('open', function() {});
      conn.on('data', data => {
        console.log(data);
        if (data.type === 'connections') {
          if (this.firstConnection) {
            this.firstConnection = false;
            return;
          }
          data.ids.forEach(user => {
            console.log('checking ' + this.peer.id);
            if (!this.roomUsersId.includes(user) && this.peer.id !== user) {
              this.roomUsersId.push(user);
              const conn = this.peer.connect(user);
              console.log('connected to ' + user);
              conn.on('open', () => {
                console.log('pushed' + conn.peer);
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
        console.log('This connection is to ' + conn.peer);
        this.conns.push(conn);
      });
      console.log('hello ' + peerId);
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
