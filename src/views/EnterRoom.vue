<template>
  <div class="viewing-room-container">
    <div class="video-side">
      <VideoPlayer
        v-if="username"
        ref="video"
        style="display: none;"
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
    <div class="chat-side">
      <ChatArea v-if="conns && username && !loading" :conns="conns" :username="username" />
    </div>
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
          if (c.peer === conn.peer) {
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
      const name = e.target.value;
      if (name.trim() === '') {
        return;
      }
      e.target.disabled = true;
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
        console.log('host open', conn);
        console.log('Connection Opened');
        this.loading = false;
        this.disconnectEvent(conn);
        conn.on('data', data => {
          switch (data.type) {
            case 'username':
              console.log('Recieved username', data);
              this.users.push(data);
              this.conns.push(conn);
              break;
            case 'connections':
              console.log('new connection arrived', data);
              // Lets new connection not try to connect to others in the room since they'll cconnect to them
              if (this.firstConnection) {
                this.roomUsersId = data.ids; // potential bug, concerned about connecting to old candadite if disconnected but this user joins before it's registered
                this.firstConnection = false;
                console.log('first connection', this.roomUsersId);
                return;
              }

              // If already connected to host and a new connection comes in
              data.ids.forEach(user => {
                console.log('connecting to new connection', user);
                if (!this.roomUsersId.includes(user) && this.peer.id !== user) {
                  this.roomUsersId.push(user);
                  const conn = this.peer.connect(user);
                  console.log('attempting to connect to new connection', conn);
                  conn.on('open', () => {
                    conn.send({ type: 'username', name: this.username, peerId: this.peer.id });
                    console.log('connection opened, send username', conn);
                  });
                  conn.on('data', data => {
                    // need DRY
                    if (data.type === 'username') {
                      console.log('username recieved being pushed into array', data);
                      this.users.push(data);
                    }
                  });
                  this.disconnectEvent(conn);
                  this.conns.push(conn);
                  console.log('pushed the connection into array', conn);
                }
              });
              break;
            case 'stream stopped':
              console.log('call disconnected');
              this.streaming = false;
              this.$refs.video.$refs.mainVideo.srcObject = null; // will make it a state soon
              break;
          }
        });
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

      this.peer.on('connection', conn => {
        this.conns.push(conn);
        conn.on('open', () => {
          console.log('someone is trying to connect to you');
          // sending back usernamne MAKE DRY
          conn.send({ type: 'username', name: this.username, peerId: this.peer.id });
          conn.on('data', data => {
            if (data.type === 'username') {
              console.log('username recieved being pushed into array', data);
              this.users.push(data);
            }
          });
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.viewing-room-container {
  display: flex;
  width: 100%;

  .video-side {
    width: 100%;
  }

  .chat-side {
    margin-left: auto;
  }
}

.loading-in {
  color: white;
  font-size: 30px;
  font-weight: 500;
}

.show {
  display: block !important;
}
</style>
