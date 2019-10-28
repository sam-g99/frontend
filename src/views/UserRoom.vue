<template>
  <div class="viewing-room-container">
    <VideoPlayer ref="video" :streaming="streaming" />
    <ChatArea v-if="conns" :conns="conns" :username="username" />
    <StreamButton
      v-if="videoPlayer"
      :videoPlayer="videoPlayer"
      :peer="peer"
      :conns="conns"
      @streaming="setStream"
    />
    <ConnectedUsers :users="users" />
  </div>
</template>

<script>
import VideoPlayer from '@/components/video/VideoPlayer';
import ChatArea from '@/components/chat/ChatArea.vue';
import ConnectedUsers from '@/components/chat/ConnectedUsers.vue';
import StreamButton from '@/components/video/StreamButton';

export default {
  components: {
    VideoPlayer,
    ChatArea,
    ConnectedUsers,
    StreamButton,
  },
  data: () => {
    return {
      username: 'host',
      conn: '',
      conns: [],
      peer: {},
      stream: {},
      videoPlayer: '',
      users: [],
      streaming: false,
    };
  },
  mounted() {
    this.start();
    this.videoPlayer = this.$refs.video.$refs.mainVideo;
  },
  methods: {
    disconnectEvent(conn) {
      conn.on('close', () => {
        this.conns.forEach((c, i) => {
          if (c.id === conn.peer) {
            this.conns.splice(i, 1);
          }
        });
        this.users.forEach((user, i) => {
          if (user.peerId === conn.peer) {
            this.users.splice(i, 1);
          }
        });
      });
    },
    // All the stuff for mesh network

    getPeerId() {
      this.peer = this.peerId('host');
    },

    peerConnection() {
      this.peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
      });
    },
    sendToAllPeers(message) {
      this.conns.forEach(conn => {
        conn.send(message);
      });
    },
    getPeers() {
      this.peer.on('connection', conn => {
        // add connection to connection list
        this.conns.push(conn);

        // Send the connection status to all peers
        conn.on('open', () => {
          const peerIds = this.conns.map(c => c.peer);
          this.sendToAllPeers({ type: 'connections', ids: peerIds });
        });

        // Host gets username
        conn.on('data', data => {
          console.log('username attempt');
          if (data.type === 'username') {
            conn.send({ type: 'username', name: this.username, peerId: this.peer.id });
            this.users.push(data);
            conn.send(this.users);
          }
        });
        this.disconnectEvent(conn);
        // send stream to new user
        if (this.streaming) {
          this.peer.call(conn.peer, this.stream);
        }
      });
    },
    setStream(stream) {
      this.streaming = true;
      this.stream = stream;
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
