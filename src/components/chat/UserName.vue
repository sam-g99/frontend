<template>
  <div>
    <div class="username-container">
      <input
        ref="mainInput"
        type="text"
        placeholder="Enter a username"
        maxlength="16"
        required="true"
        @keyup.enter="action"
      />
      <span class="counter"></span>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  data(){
    return {
      charactersLeft: 16,
    }
  },
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
