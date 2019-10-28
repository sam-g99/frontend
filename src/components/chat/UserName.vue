<template>
  <div class="username-container">
    <label> To join a room enter a username</label>
    <input ref="mainInput" type="text" placeholder="Enter a username" @keyup.enter="action" />
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: {
    action: { type: Function, required: true },
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
  label {
    font-size: 18px;
  }
}
input {
  background: #342f52;
  border: none;
  padding: 10px;
  font-size: 18px;
  width: 320px;
  margin-top: 10px;
  border-radius: 100px;
  outline: none;
  color: white;
}
</style>
