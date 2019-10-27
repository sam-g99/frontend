<template>
  <div class="video-player__controls">
    <button @click="mute">{{ isMuted ? 'unmute' : 'mute' }}</button>
  </div>
</template>

<script>
export default {
  inheritAttrs: true,
  props: {},
  data: () => {
    return {
      videoPlayer: null,
      isMuted: false,
    };
  },
  mounted() {
    this.videoPlayer = this.$parent.$refs.mainVideo;
  },
  methods: {
    mute() {
      this.videoPlayer.muted = !this.videoPlayer.muted;
      this.isMuted = this.videoPlayer.muted;
    },
  },
};
</script>

<style lang="scss" scoped>
.video-player {
  &__controls {
    bottom: 10px;
    position: absolute;
    width: 100%;
    z-index: 5;

    button {
      float: right;
    }
  }
}
</style>
