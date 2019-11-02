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
      @stoppedStream="stoppedStream"
    />
    <ConnectedUsers v-if="username" :users="users" />

    <div v-if="username" class="room-link-container">
      <CopyInput :shareLink="shareLink">
        <p class="share-title">Share Room Link</p>
      </CopyInput>
    </div>
    <UserName v-if="!username" :action="setUsername" alert="Enter a username to host" />
    <ChatArea v-if="conns && username" :conns="conns" :username="username" />
  </div>
</template>

<script>
import VideoPlayer from '@/components/video/VideoPlayer';
import ChatArea from '@/components/chat/ChatArea.vue';
import ConnectedUsers from '@/components/chat/ConnectedUsers.vue';
import StreamButton from '@/components/video/StreamButton';
import UserName from '@/components/chat/UserName.vue';
import CopyInput from '@/components/CopyInput.vue';

export default {
  components: {
    VideoPlayer,
    ChatArea,
    ConnectedUsers,
    StreamButton,
    UserName,
    CopyInput,
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

      this.peer.on('disconnected', () => {
        alert(
          'Something with wrong with your connection to the peer server. Try to make a new room',
        );
      });

      this.peer.on('error', function(err) {
        console.log(err);
        alert('' + err);
      });

      // Second Step - Listen for incoming connecitons
      this.peer.on('connection', conn => {
        // Stop if there are already 10 connections
        if (this.conns.length === 10) {
          conn.send({ type: 'full' });

          setTimeout(() => {
            conn.close();
          }, 500);

          console.log('closed the connection due to max number of users');
          return;
        }

        console.log('User conneced', conn.peer);

        conn.on('open', () => {
          console.log('connection is open', conn.peer);
          // add connection to connection list
          this.conns.push(conn);
          console.log('added to connection list', conn.peer);

          // Letting the new connection know the hosts username
          conn.send({ type: 'username', name: this.username, peerId: this.peer.id });

          const peerIds = this.conns.map(c => c.peer);

          // sending connected peer ids so other connections can call connection to new connection
          this.sendToAllPeers({ type: 'connections', ids: peerIds });
          console.log('notified current connections of new connection', conn.peer);

          // Making sure they are removed from the arrays when they disconnect
          this.disconnectEvent(conn);

          // send stream to new user if stream is currently active
          if (this.streaming) {
            this.peer.call(conn.peer, this.stream);
            console.log('called to send stream', conn.peer);
          }
        });

        conn.on('data', data => {
          console.log('Data Recieved', data);

          switch (data.type) {
            case 'username':
              console.log('Recieved username', data);
              this.users.push(data);
              break;
          }
        });
      });
    },
    disconnectEvent(conn) {
      conn.on('close', () => {
        console.log('connection closed', conn);
        this.conns.forEach((c, i) => {
          if (c.peer === conn.peer) {
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

    sendToAllPeers(message) {
      this.conns.forEach(conn => {
        conn.send(message);
      });
    },
    setStream(stream) {
      this.streaming = true;
      this.stream = stream;
    },
    stoppedStream() {
      this.sendToAllPeers({ type: 'stream stopped' });
      console.log('sent to all peers that stream stopped');
      this.streaming = false;
      this.stream = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.viewing-room-container {
  .room-link-container {
    padding: 10px;

    p {
      color: white;
      font-weight: 500;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }

  button {
    background: rgb(41, 121, 226);
    border: none;
    color: white;
    padding: 13px;
  }
}
</style>
