<template>
  <div class="chat-room">
    <div class="title">
      <h3>Room Chat</h3>
      <p class="users-name">
        <b>Welcome, {{ username }} </b>
      </p>
      <p class="info">Messages you send will show no name on your screen.</p>
    </div>
    <div ref="messageContainer" class="chat-container">
      <div v-for="(message, index) in messages" :key="index" class="message-container">
        <div class="username">
          <p>
            {{ message.author }}
          </p>
        </div>
        <div class="date">
          {{ new Date(message.date).getHours() }}:{{
            new Date(message.date).getMinutes() > 10
              ? new Date(message.date).getMinutes()
              : '0' + new Date(message.date).getMinutes()
          }}
        </div>
        <div class="content">
          <p>{{ message.content }}</p>
        </div>
      </div>
    </div>
    <p v-if="typing" class="is-typing">
      <b> {{ typer }} </b> is typing...
    </p>
    <div class="send-container">
      <input
        v-model="currentMessage"
        type="text"
        placeholder="Send a message"
        @keyup.enter="sendMessage()"
        @keyup.prevent.13="sendTypingStatus()"
        @keypress.13.prevent
      />
      <button>Send</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    conns: {
      type: Array,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },
  },
  data: () => {
    return {
      amount: 1,
      currentMessage: '',
      messages: [],
      typing: false,
      typer: '',
    };
  },
  watch: {
    conns: function(newConns) {
      const conn = newConns[newConns.length - 1];
      this.listenForMessages(conn);
    },
  },
  mounted() {},
  methods: {
    createMessageObject() {
      return {
        type: 'message',
        author: this.username,
        date: new Date(),
        content: this.currentMessage,
      };
    },
    sendToAllPeers(message) {
      console.log(message);
      this.conns.forEach(conn => {
        conn.send(message);
      });
    },
    sendMessage() {
      if (this.currentMessage.trim() === '') {
        return false;
      }
      const message = this.createMessageObject();
      this.messages.push(message);
      this.sendToAllPeers(message);
      this.currentMessage = '';
      const container = this.$refs.messageContainer;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 10);
    },

    listenForMessages(conn) {
      conn.on('data', msg => {
        if (msg.type === 'typing') {
          this.typing = true;
          this.typer = msg.username;
          setTimeout(() => {
            this.typing = false;
          }, 100);
        }
        if (msg.type !== 'message') {
          return;
        }
        console.log('message recieved', msg);
        const container = this.$refs.messageContainer;
        setTimeout(() => {
          this.messages.push(msg);
          container.scrollTop = container.scrollHeight;
        });
      });
    },
    sendTypingStatus() {
      // Will finesse later
      // this.sendToAllPeers({ type: 'typing', username: this.username });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.chat-room {
  align-items: center;
  background: #2c2844;
  display: flex;
  flex-flow: column;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  width: 400px;

  .is-typing {
    color: white;
    margin-bottom: 10px;
  }

  .title {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: white;
    padding: 30px;
    padding-bottom: 15px;
    text-align: center;
    width: 100%;

    h3 {
      font-size: 30px;
      font-weight: 500;
    }
  }

  .users-name {
    margin-top: 10px;
  }

  .info {
    background: #3a335e;
    border-radius: 5px;
    margin-top: 15px;
    padding: 5px;
  }

  .chat-container {
    align-items: center;
    align-self: flex-end;
    color: white;
    display: flex;
    flex-flow: column;
    height: 800px;
    margin-bottom: 10px;
    margin-top: auto;
    overflow-y: scroll;
    padding-bottom: 10px;
    padding-top: 20px;
    position: relative;
    width: 100%;

    .message-container {
      background: #35314d;
      border-radius: 5px;
      padding: 10px;
      position: relative;
      width: 95%;
      word-wrap: break-word;
      @include vertical-spacing(10px);

      &:first-of-type {
        margin-top: auto;
      }

      .username {
        background: #2c2844;
        border-radius: 100px;
        display: inline-block;
        font-weight: 500;
        margin-bottom: 7px;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        width: auto;
      }

      .date {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
  }

  .send-container {
    align-self: flex-end;
    position: relative;
    width: 100%;

    input[type='text'] {
      background: #35314d;
      border: none;
      color: white;
      font-size: 16px;
      outline: none;
      padding: 15px;
      width: 80%;
    }

    ::placeholder {
      color: white;
    }

    button {
      height: 100%;
      padding: 2px;
      position: absolute;
      right: 0;
      top: 0;
      width: 20%;
    }
  }
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background: #35314d;
}

::-webkit-scrollbar-thumb {
  background: #202020;
}
</style>
