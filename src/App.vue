<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    titleTemplate: titleChunk => {
      return titleChunk ? `${titleChunk} | NachoNight` : 'NachoNight';
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/main.scss';

* {
  margin: 0;
  padding: 0;
}

#app {
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  text-align: center;
  width: 100vw;

  @include flex(center, center);
  // TEMPORARY RULES FOR INITIAL LAYOUT. REMOVE THEM IF NECESSARY.
}
</style>
