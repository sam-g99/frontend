<template>
  <div class="video-player">
    <video ref="mainVideo" class="video-player__video" controls autoplay></video>
    <div v-if="!streaming" class="video-player__layer">
      <p class="wait">Waiting for stream</p>
    </div>
  </div>
</template>

<script>
import Controls from './Controls';

export default {
  components: {
    Controls,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['stream', 'streaming'],
  mounted() {},
};
</script>

<style lang="scss" scoped>
.video-player {
  max-width: 1080px;
  position: relative;
  user-select: none;
  width: 60%;

  &__video {
    width: 100%;
    max-height: 620px;
  }

  &__layer {
    align-items: center;
    background: hsl(0, 0%, 14%);
    display: flex;
    height: 100%;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 100%;

    .wait {
      color: white;
      font-size: 30px;
    }
  }

  &__controls {
    bottom: 10px;
    position: absolute;
  }
}
</style>
