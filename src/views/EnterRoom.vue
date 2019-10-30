<template>
  <div class="viewing-room-container">
    <ChatArea v-if="conns && username && !loading" :conns="conns" :username="username" />
    <VideoPlayer
      v-if="username"
      ref="video"
      style="display:none"
      :class="{ show: !loading }"
      :streaming="streaming"
    />
    <ConnectedUsers v-if="username && !loading" :users="users" />
    <UserName
      v-if="!username || loading"
      :action="setUsername"
      alert="To join the room enter a username"
    />
    <p v-if="loading" class="loading-in">
      Loading you in now...if it takes to long host may not exist or an unknown error.
    </p>
  </div>
</template>

<script>
import VideoPlayer from '@/components/video/VideoPlayer';
import ChatArea from '@/components/chat/ChatArea.vue';
import UserName from '@/components/chat/UserName.vue';
import ConnectedUsers from '@/components/chat/ConnectedUsers.vue';

export default {
  components: {
    VideoPlayer,
    ChatArea,
    UserName,
    ConnectedUsers,
  },
  data: () => {
    return {
      username: '',
      peer: {},
      userIds: [''],
      roomId: 'host',
      messages: [],
      conn: '',
      conns: [],
      users: [],
      userId: '',
      roomUsersId: [],
      firstConnection: true,
      stream: '',
      streaming: false,
      loading: false,
    };
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
            if (i === 0) {
              alert(
                "Welp your host left, you're better off finding another or hosting a room yourself.",
              );
            }
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
      this.loading = true;
      // waiting for dom
      setTimeout(() => {
        this.connectToHost();
      });
    },

    connectToHost() {
      this.peer = this.peerConnect('');
      this.peer.on('open', id => {
        console.log(id);
      });
      const conn = this.peer.connect(this.$route.params.id);
      // Sending username to host once connected
      conn.on('open', () => {
        conn.send({ type: 'username', name: this.username, peerId: this.peer.id });
        console.log('Connection Opened');
        this.loading = false;
        this.disconnectEvent(conn);
      });

      // Managing mesh network
      this.peer.on('call', call => {
        console.log('called');
        call.answer();
        call.on('stream', hostStream => {
          let videoPlayer;
          videoPlayer = this.$refs.video.$refs.mainVideo;
          videoPlayer.srcObject = hostStream;
          videoPlayer.muted = false;
          this.streaming = true;
        });
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
.loading-in {
  color: white;
  font-weight: 500;
  font-size: 30px;
}
.show {
  display: block !important;
}
</style>
