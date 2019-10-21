<template>
  <div class="coming-soon" :class="{ inputMode: isFocused }">
    <LogoAnimated height="150px" />
    <h1>Coming Soon</h1>
    <p class="coming-soon__desc">Share your screen, window and tabs with your friends</p>

    <Form :action="submitEmail" :submitted="submitted" />

    <Twitter :submitted="submitted" />

    <PurpleNachos :amount="nachosAmount" />
    <PurpleNachos :amount="8" />
  </div>
</template>

<script>
import PurpleNachos from '@/components/PurpleNachos';
import Twitter from '@/components/Twitter';
import Form from '@/components/Form';
import LogoAnimated from '@/components/LogoAnimated.vue';

export default {
  name: 'ComingSoon',
  components: { PurpleNachos, Twitter, Form, LogoAnimated },
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
    nachosAmount: 8,
    meta: {
      title: 'Coming Soon',
      description: {
        name: 'description',
        content:
          'NachoNight is coming soon. Share your screen, window, or tab with your friends in real time.',
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
    const adjustNachos = () => {
      if (window.innerWidth < 1150) {
        this.nachosAmount = 19;
      } else {
        this.nachosAmount = 8;
      }
    };
    adjustNachos();
    const minHeight = 600;
    const adjustHeight = () => {
      if (window.innerHeight < minHeight && window.matchMedia('(orientation: landscape)').matches) {
        this.$store.state.windowHeight = minHeight;
      } else {
        this.$store.state.windowHeight = window.innerHeight;
      }
    };
    adjustHeight();
    window.addEventListener('resize', () => {
      if (this.$refs.email !== document.activeElement) {
        adjustHeight();
      }
      // Purple Nacho Logic
      adjustNachos();
    });
  },
  methods: {
    submitEmail() {
      if (!this.submitted) {
        this.submitted = true;
      }
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
}
</style>
