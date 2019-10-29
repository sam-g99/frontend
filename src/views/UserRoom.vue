<template>
  <div class="viewing-room-container">
    <VideoPlayer v-if="username" ref="video" :streaming="streaming" />
    <ChatArea v-if="conns && username" :conns="conns" :username="username" />
    <StreamButton
      v-if="videoPlayer && username"
      :videoPlayer="videoPlayer"
      :peer="peer"
      :conns="conns"
      @streaming="setStream"
    />
    <ConnectedUsers v-if="username" :users="users" />
    <div v-if="username" class="room-link-container">
      <p>Share Room Link</p>
      <input ref="roomLink" type="text" :value="`${shareLink}`" class="copy-input" readonly />
      <button @click="copyLink">Copy Link</button>
    </div>
    <UserName v-if="!username" :action="setUsername" alert="Enter a username to host" />
  </div>
</template>

<script>
import VideoPlayer from '@/components/video/VideoPlayer';
import ChatArea from '@/components/chat/ChatArea.vue';
import ConnectedUsers from '@/components/chat/ConnectedUsers.vue';
import StreamButton from '@/components/video/StreamButton';
import UserName from '@/components/chat/UserName.vue';

export default {
  components: {
    VideoPlayer,
    ChatArea,
    ConnectedUsers,
    StreamButton,
    UserName,
  },
  data: () => {
    return {
      username: '',
      conn: '',
      conns: [],
      peer: {},
      stream: {},
      videoPlayer: '',
      users: [],
      streaming: false,
      shareLink: 'Connection...',
    };
  },
  mounted() {
    this.start();
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
      this.peer = this.peerId();
      this.peer.on('open', id => {
        this.shareLink = `${window.location.origin}/room/${id}`;
      });
    },
    setUsername(e) {
      e.target.disabled = true;
      const name = e.target.value;
      if (name.trim() === '') {
        return;
      }
      this.username = name;
      // wait for dom
      setTimeout(() => {
        this.videoPlayer = this.$refs.video.$refs.mainVideo;
      });
    },
    copyLink() {
      const link = this.$refs.roomLink;
      link.select();
      link.setSelectionRange(0, 99999);
      document.execCommand('copy');
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
        console.log('User conneced', conn.peer);
        // add connection to connection list
        this.conns.push(conn);

        // Send the connection status to all peers
        conn.on('open', () => {
          console.log('connection is open');
          const peerIds = this.conns.map(c => c.peer);
          this.sendToAllPeers({ type: 'connections', ids: peerIds });
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
  .copy-input {
    border: none;
    padding: 10px;
    background: #25213d;
    color: white;
    font-size: 20px;
  }

  .room-link-container {
    padding: 10px;
    p {
      color: white;
      margin-top: 10px;
      margin-bottom: 10px;
      font-weight: 500;
    }
  }
  button {
    background: rgb(41, 121, 226);
    border: none;
    padding: 13px;
    color: white;
  }
}
</style>
