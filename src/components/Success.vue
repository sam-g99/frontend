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
  opacity: 0;
  padding: 10px;
  position: absolute;
  transform: translateX(-200px);
  visibility: hidden;
  width: 100%;
  @include flex(center, center);

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
  animation-delay: 0.1s;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-name: come-in;
  animation-timing-function: ease-in-out;
}

@keyframes come-in {
  0% {
    opacity: 0;
    transform: translateX(200px);
  }

  50% {
    opacity: 0.7;
    transform: translateX(0px);
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
    visibility: visible;
  }
}
</style>
