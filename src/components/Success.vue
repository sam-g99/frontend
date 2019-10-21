<template>
  <div class="success" :class="{ comeIn: submitted }">
    <h3>Congrats - Email Added</h3>
    <p>You'll be notified once we go live!</p>
  </div>
</template>

<script>
export default {
  props: {
    submitted: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.success {
  background: #fff;
  border-radius: 5px;
  color: $purple;
  flex-flow: column;
  height: 130px;
  max-width: 500px;
  padding: 10px;
  width: 100%;
  @include flex(center, center);
  opacity: 0;
  visibility: hidden;
  position: absolute;
  transform: translateX(-200px);
  h3 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  p {
    color: rgb(31, 31, 31);
    font-size: 22px;
  }
}

.comeIn {
  animation-duration: 0.5s;
  animation-name: come-in;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  animation-delay: 0.3s;
}

@keyframes come-in {
  0% {
    opacity: 0;
    transform: translateX(200px);
    position: relative;
  }

  50% {
    opacity: 0.7;
    transform: translateX(0px);
    position: relative;
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
    visibility: visible;
    position: relative;
  }
}
</style>
