<template>
  <div class="logo-animated">
    <img class="logo-animated__logo" src="@/assets/logo_transparent_full_eyeless.svg" alt="logo" />
    <img
      class="logo-animated__eye logo-animated__eye--left"
      src="@/assets/logo_eye.svg"
      alt="eye"
    />
    <img
      class="logo-animated__eye logo-animated__eye--right"
      src="@/assets/logo_eye.svg"
      alt="eye"
    />
  </div>
</template>

<script>
export default {
  name: 'LogoAnimated',
  mounted() {
    this.mouseTracker('.logo-animated__eye--left');
    this.mouseTracker('.logo-animated__eye--right');
  },
  methods: {
    mouseTracker(className) {
      let app = document.querySelector('#app');
      app.addEventListener('mousemove', e => {
        let eye = document.querySelector(className);
        let mouseX = eye.getBoundingClientRect().left;
        let mouseY = eye.getBoundingClientRect().top;
        let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
        let rotationDegrees = radianDegrees * (180 / Math.PI) * -1 + 90;
        eye.style.transform = `rotate(${rotationDegrees}deg)`;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.logo-animated {
  // TODO: FIGURE OUT A WAY TO MAKE THE SIZE RESPONSIVE.
  $logo-size: 100px;
  height: $logo-size;
  position: relative;
  @include flex(center, center);

  &__logo {
    height: 100%;
  }

  &__eye {
    $eye-size: calc(#{$logo-size} / 3.63);
    height: $eye-size;
    position: absolute;
    width: $eye-size;

    &--left {
      left: 5%;
      top: 26%;
    }

    &--right {
      left: 17%;
      top: 20.5%;
    }
  }
}
</style>
