<template>
  <div class="chat-room">
    <div class="title">
      <h3>Room Chat</h3>
    </div>
    <div ref="messageContainer" class="messages-container">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div class="username">
          <p>
            <b>{{ message.user }}</b>
          </p>
        </div>

        <div class="content">
          <p>{{ message.content }}</p>
        </div>
      </div>
    </div>
    <div class="search-container">
      <input
        v-model="currentMessage"
        type="text"
        placeholder="Send a message"
        @keyup.enter="sendMessage()"
      />
      <button>Send</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    conns: {
      type: Array,
    },
    conn: {
      type: Object,
    },
  },
  data: () => {
    return {
      amount: 1,
      currentMessage: '',
      messages: [
        {
          user: 'Titan',
          content: 'Yayeet',
        },
      ],
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
    sendMessage() {
      if (this.currentMessage === '') {
        return false;
      }
      this.messages.push({
        user: 'Titan',
        content: this.currentMessage,
      });
      this.conns.forEach(conn => {
        conn.send({ type: 'message', content: this.currentMessage });
      });
      this.currentMessage = '';
      const container = this.$refs.messageContainer;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 10);
    },

    listenForMessages(conn) {
      conn.on('data', data => {
        if (!data.type === 'message') {
          return;
        }
        this.messages.push({ user: 'Titan', content: data.content });
        const container = this.$refs.messageContainer;
        setTimeout(() => {
          container.scrollTop = container.scrollHeight;
        }, 10);
      });
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

  .title {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: white;
    padding: 30px;
    text-align: center;
    width: 100%;

    h3 {
      font-size: 30px;
      font-weight: 500;
    }
  }

  .messages-container {
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
    width: 100%;

    .message {
      background: #35314d;
      border-radius: 5px;
      padding: 10px;
      width: 95%;

      &:first-of-type {
        margin-top: auto;
      }
      @include vertical-spacing(10px);
    }
  }

  .search-container {
    align-self: flex-end;
    position: relative;
    width: 100%;

    input[type='text'] {
      background: #35314d;
      border: none;
      color: white;
      font-size: 14px;
      outline: none;
      padding: 10px;
      width: 100%;
    }

    ::placeholder {
      color: white;
    }

    button {
      padding: 2px;
      position: absolute;
      right: 0;
      top: 0;
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
