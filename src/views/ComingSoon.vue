<template>
  <div class="coming-soon">
    <img class="coming-soon__logo" src="@/assets/logo_transparent_full.svg" alt="logo" />
    <p>Nacho Night is under development.</p>
    <a
      class="coming-soon__social-links"
      href="https://github.com/NachoNight"
      target="_blank"
      rel="noopener noreferrer"
      ><img src="@/assets/icons/github.svg" alt="github" />Our Github!</a
    >
  </div>
</template>

<script>
export default {
  name: 'ComingSoon',
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.coming-soon {
  background-color: #5b5095;
  color: #fff;
  flex-direction: column;
  @include flex(center, center);
  @include page-container;

  * {
    margin: 0.5em;
  }

  &__logo {
    height: 100px;
  }

  &__social-links {
    color: #fff;
    text-decoration: none;
    @include flex(center, center);

    img {
      height: 40px;
    }
  }
}
</style>
