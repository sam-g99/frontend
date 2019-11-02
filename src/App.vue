<template>
  <div id="app" :style="{ height: `${windowHeight}px` }">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  metaInfo: {
    titleTemplate: titleChunk => {
      return titleChunk ? `${titleChunk} | NachoNight` : 'NachoNight';
    },
  },
  computed: {
    ...mapState(['windowHeight']),
  },
  mounted() {},
};
</script>

<style lang="scss">
@import '@/styles/main.scss';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  color: #2c3e50;
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  position: relative;
  width: 100%;
}

.viewing-room-container {
  background: #1b182d !important;
  min-height: 100vh;
}
</style>
