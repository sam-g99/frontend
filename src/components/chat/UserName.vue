<template>
  <div>
    <div class="username-container">
      <label> {{ alert }}</label>
      <input
        ref="mainInput"
        type="text"
        placeholder="Enter a username"
        maxlength="16"
        required="true"
        @keyup.enter="action"
      />
    </div>
    <!-- <div class="desc">
      <h3>Please read (If you are hosting, I suggest you use Chrome)</h3>
      <p>
        Hey, with this demo application you can host and connect to rooms where the host streams
        their screen,application window, or tab via p2p communication. This was made to research and
        demonstrate the potential of Nacho Night (an upcoming open source platform I started with
        other devs) and start planning a more solid application. If you want to share a video with
        audio please use tab sharing and click the <b>share audio</b> checkbox since so far desktop
        audio access is only via extension as well as auto checking the share audio button.
      </p>
    </div> -->
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: {
    action: { type: Function, required: true },
    alert: { type: String, required: true },
  },
  mounted() {
    this.$refs.mainInput.focus();
  },
};
</script>

<style lang="scss" scoped>
.username-container {
  color: white;
  display: flex;
  flex-flow: column;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  label {
    font-size: 18px;
  }
}
input {
  background: #ffffff;
  border: none;
  padding: 12px;
  font-size: 18px;
  width: 320px;
  margin-top: 10px;
  border-radius: 10px;
  outline: none;
  color: rgb(26, 26, 26);
}

.desc {
  background: #be5959;
  padding: 10px;
  border-radius: 10px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 700px;
  max-height: 500px;
  color: rgb(0, 0, 0);
  height: auto;
  h3 {
    font-weight: 500;
    margin-bottom: 10px;
  }
}
</style>
