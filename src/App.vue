<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@/styles/main.scss';

* {
  margin: 0;
  padding: 0;
}

#app {
  @include flex(center, center);
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  // TEMPORARY RULES FOR INITIAL LAYOUT. REMOVE THEM IF NECESSARY.
  height: 100vh;
  width: 100vw;
}
</style>
