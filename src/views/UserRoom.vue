<template>
  <div class="viewing-room-container">
    <VideoPlayer v-if="username" ref="video" :streaming="streaming" />
    <!-- <ChatArea v-if="conns && username" :conns="conns" :username="username" /> -->
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
    this.runPeerProccesses();
  },
  methods: {
    runPeerProccesses() {
      // First step - connecting to peer server to broker connections
      this.peer = this.peerConnect('');

      this.peer.on('open', id => {
        console.log('Peer connection opened', id);
        this.shareLink = `${window.location.origin}/room/${id}`;
      });

      this.peer.on('error', function(err) {
        console.log(err);
        alert('' + err);
      });

      // Second Step - Listen for incoming connecitons
      this.peer.on('connection', conn => {
        console.log('User conneced', conn.peer);

        conn.on('open', () => {
          console.log('connection is open', conn.peer);

          // Letting the new connection know the hosts username
          conn.send({ type: 'username', name: this.username, peerId: this.peer.id });

          const peerIds = this.conns.map(c => c.peer);

          // sending this so other connections can call connection to new connection
          this.sendToAllPeers({ type: 'connections', ids: peerIds });
          console.log('notified current connections of new connection', conn.peer);

          // add connection to connection list
          this.conns.push(conn);
          console.log('added to connection list', conn.peer);

          this.disconnectEvent(conn);

          // send stream to new user
          if (this.streaming) {
            this.peer.call(conn.peer, this.stream);
            console.log('called to send stream', conn.peer);
          }
        });

        conn.on('data', data => {
          console.log('Data Recieved');

          switch (data.type) {
            case 'username':
              console.log('Recieved username', data);
              this.users.push(data);
              conn.send(this.users); // sending back a list of users
              console.log('sent list of usernames', conn.peer);
              break;
          }
        });
      });
    },
    disconnectEvent(conn) {
      conn.on('close', () => {
        console.log('connection closed', conn);
        this.conns.forEach((c, i) => {
          if (c.id === conn.peer) {
            this.conns.splice(i, 1);
            console.log('connection removed', conn.peer);
          }
        });
        this.users.forEach((user, i) => {
          if (user.peerId === conn.peer) {
            this.users.splice(i, 1);
            console.log('username removed', user.name);
          }
        });
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

    sendToAllPeers(message) {
      this.conns.forEach(conn => {
        conn.send(message);
      });
    },
    setStream(stream) {
      this.streaming = true;
      this.stream = stream;
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
