<template>
  <div class="purple-nachos">
    <img v-for="i in amount" :key="i" src="@/assets/purple-nacho.svg" alt="purple nacho" />
  </div>
</template>

<script>
export default {
  name: 'PurpleNachos',
  props: {
    amount: {
      type: Number,
      default: 0,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.purple-nachos {
  align-self: flex-start;
  bottom: -40px;
  display: flex;
  position: absolute;
  z-index: 1;

  &:last-of-type {
    right: 0;
    @include breakpoint-max(1150) {
      display: none;
    }
  }

  $moveUp: -10px;

  img {
    margin-left: -25px;
    margin-right: -35px;
    outline: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    transition: 0.2s;
    -webkit-user-drag: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 120px;

    &:hover {
      transform: scale(1.2) translateY($moveUp);
    }

    &:active {
      transform: scale(1);
    }

    &:nth-child(2n) {
      transform: rotate(30deg);

      &:hover {
        transform: scale(1.2) rotate(30deg) translateY($moveUp);
      }

      &:active {
        transform: scale(1) rotate(30deg);
      }
    }

    &:nth-child(3n) {
      transform: rotate(10deg);

      &:hover {
        transform: scale(1.2) rotate(10deg) translateY($moveUp);
      }

      &:active {
        transform: scale(1) rotate(10deg);
      }
    }
  }
}
</style>
