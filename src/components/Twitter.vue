<template>
  <div class="twitter" :class="{ submitted: submitted }">
    <p v-if="submitted">If you want more updates.</p>
    <a
      class="twitter-link"
      href="https://twitter.com/NachoNightTv"
      target="_blank"
      rel="noopener noreferrer"
      :class="{ twitterBlue: submitted }"
    >
      <img src="@/assets/icons/twitter.png" alt="" /> Follow us on Twitter
    </a>
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

.twitter {
  color: #fff;
  margin-top: auto;
  text-decoration: none;
  transition: margin 0.1s;
  @include breakpoint($desktop) {
    margin-bottom: 15px;
  }

  @include breakpoint-max(1150) {
    margin-bottom: 90px;
  }

  .twitter-link {
    color: white;
    text-decoration: none;
    transition: transform 0.2s;
    @include flex(center, center);

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(1);
    }
  }

  p {
    font-weight: 300;
    margin-bottom: 10px;
  }

  img {
    margin-right: 5px;
    width: 24px;
  }
}

.twitterBlue {
  background: #00aaec;
  border-radius: 10px;
  padding: 10px;
}
</style>
