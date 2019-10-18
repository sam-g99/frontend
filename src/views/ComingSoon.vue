<template>
  <div class="coming-soon" :class="{ inputMode: isFocused }">
    <img class="coming-soon__logo" src="@/assets/logo_transparent_full.svg" alt="logo" />
    <h1>Coming Soon</h1>
    <p class="coming-soon__desc">Share your screen, window and tabs with your friends</p>
    <form @submit.prevent="submitEmail">
      <input
        v-if="!submitted"
        ref="email"
        class="coming-soon__email"
        type="email"
        name="email"
        placeholder="Enter your email"
        required="true"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <button v-if="!submitted" type="submit" class="coming-soon__notify">Notify Me!</button>
      <div v-if="submitted" class="success">
        <h3>Congrats - Email Added</h3>
        <p>You'll be notified once we go live!</p>
      </div>
    </form>
    <div class="coming-soon__twitter" :class="{ submitted: submitted }">
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

    <div class="purple-nachos">
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
    </div>
    <div class="purple-nachos">
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
      <img src="@/assets/purple-nacho.svg" alt="" srcset="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComingSoon',
  metaInfo() {
    return {
      title: this.meta.title,
      meta: [
        {
          name: this.meta.description.name,
          content: this.meta.description.content,
        },
        {
          name: 'og:title',
          content: this.meta.title,
        },
        {
          name: 'og:description',
          content: this.meta.description.content,
        },
        {
          name: 'og:image',
          content: this.meta.image.url,
        },
        {
          name: 'og:url',
          content: this.meta.url,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:site',
          content: this.meta.twitter.site,
        },
        {
          name: 'twitter:creator',
          content: this.meta.twitter.creator,
        },
        {
          name: 'twitter:title',
          content: this.meta.title,
        },
        {
          name: 'twitter:description',
          content: this.meta.description.content,
        },
        {
          name: 'twitter:image',
          content: this.meta.image.url,
        },
        {
          name: 'twitter:image:alt',
          content: this.meta.image.alt,
        },
      ],
    };
  },
  data: () => ({
    isFocused: '',
    submitted: false,
    meta: {
      title: 'Coming Soon',
      description: {
        name: 'description',
        content: 'NachoNight is an MIT licensed open-source project under development.',
      },
      image: {
        url: 'url',
        alt: 'Coming Soon',
      },
      twitter: {
        site: '@NachoNightTv',
        creator: '@NachoNightTv',
      },
      url: 'https://nachonight.tv/coming-soon',
    },
  }),
  mounted() {
    const minHeight = 600;
    if (window.innerHeight < minHeight && window.matchMedia('(orientation: landscape)').matches) {
      this.$store.state.windowHeight = minHeight;
    } else {
      this.$store.state.windowHeight = window.innerHeight;
    }
    window.addEventListener('resize', () => {
      if (this.$refs.email !== document.activeElement) {
        if (
          window.innerHeight < minHeight &&
          window.matchMedia('(orientation: landscape)').matches
        ) {
          this.$store.state.windowHeight = minHeight;
        } else {
          this.$store.state.windowHeight = window.innerHeight;
        }
      }
    });
  },
  methods: {
    submitEmail() {
      this.submitted = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';
$desktop: 1000;

* {
  z-index: 2;
}

.success {
  background: #ffffff;
  color: $purple;
  width: 100%;
  max-width: 500px;
  height: 130px;
  padding: 10px;
  @include flex(center, center);
  flex-flow: column;
  border-radius: 5px;
  h3 {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 10px;
  }
  p {
    font-size: 22px;
    color: rgb(31, 31, 31);
  }
}

.coming-soon {
  background-color: $purple;
  color: #fff;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 10px;
  position: relative;
  width: 100%;
  @include flex(flex-start, center);

  &__logo {
    backface-visibility: hidden;
    filter: grayscale(0%); // fixes flickering in firefox
    margin-top: 10px;
    max-width: 380px;
    width: 80%;
    will-change: width;
    @include breakpoint(375) {
      margin-top: 10px;
      width: 90%;
    }
    @include breakpoint(100) {
      max-width: 420px;
    }
    @include breakpoint-height(750) {
      margin-top: 20px;
    }
    @include breakpoint-height(850) {
      margin-top: 50px;
    }
    @include breakpoint-height(1000) {
      margin-top: 70px;
    }
  }

  h1 {
    font-size: 30px;
    font-weight: 500;
    margin-top: 10px;
    @include breakpoint(375) {
      font-size: 36px;
      margin-top: 15px;
    }
    @include breakpoint(375) {
      font-size: 40px;
    }
  }

  &__desc {
    font-size: 16px;
    font-weight: 300;
    margin-top: 25px;
    @include breakpoint(375) {
      font-size: 18px;
      margin-top: 30px;
    }
    @include breakpoint(400) {
      font-size: 20px;
    }
    @include breakpoint(450) {
      font-size: 22px;
    }
  }

  form {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-top: 30px;
    max-width: 500px;
    @include breakpoint(375) {
      margin-top: 35px;
    }
    @include breakpoint-height(750) {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    @include breakpoint($desktop) {
      .coming-soon {
        &__notify {
          margin-left: auto;
          width: 220px;
        }
      }
    }
  }

  &__email {
    border: none;
    border-radius: 5px;
    font-size: 16px;
    max-width: 500px;
    outline: none;
    padding: 10px;
    padding-bottom: 12px;
    padding-top: 12px;
    width: 100%;
    @include breakpoint(375) {
      font-size: 18px;
      padding-bottom: 15px;
      padding-top: 15px;
    }
  }

  &__notify {
    background: $green;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    margin-top: 20px;
    max-width: 500px;
    outline: none;
    padding: 10px;
    width: 100%;
    @include breakpoint(375) {
      font-size: 20px;
      padding: 12px;
    }
  }
  .twitterBlue {
    background: #00aaec;
    padding: 10px;
    border-radius: 10px;
  }

  &__twitter {
    color: #fff;
    margin-bottom: 50px;
    margin-top: auto;
    text-decoration: none;

    @include breakpoint($desktop) {
      margin-bottom: 15px;
    }
    .twitter-link {
      color: white;
      text-decoration: none;
      @include flex(center, center);
      transition: transform 0.2s;
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
  .purple-nachos {
    bottom: -40px;
    display: flex;
    position: absolute;
    width: 480px;
    z-index: 1;
    align-self: flex-start;

    &:last-of-type {
      right: 0;
    }

    img {
      margin-left: -25px;
      margin-right: -35px;
      width: 120px;
      transition: 0.2s;
      outline: none;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      user-drag: none;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-drag: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      &:hover {
        transform: scale(1.2);
      }

      &:active {
        transform: scale(1);
      }
      &:nth-child(3n) {
        transform: rotate(10deg);

        &:hover {
          transform: scale(1.2) rotate(10deg);
        }

        &:active {
          transform: scale(1) rotate(10deg);
        }
      }

      &:nth-child(2n) {
        transform: rotate(30deg);

        &:hover {
          transform: scale(1.2) rotate(30deg);
        }

        &:active {
          transform: scale(1) rotate(30deg);
        }
      }

      &:hover {
        margin-top: -30px;
      }
    }
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #3d3d3d;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #3d3d3d;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #3d3d3d;
  }
}
</style>
