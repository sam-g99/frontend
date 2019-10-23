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
  mounted() {
    const path = this.$route.fullPath;
    if (path !== '/') {
      this.$router.push('/');
    }
  },
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
  min-height: 500px;
  position: relative;
  text-align: center;
  width: 100%;
  @include flex(center, center);
}
</style>
