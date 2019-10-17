<template>
  <div class="coming-soon">
    <!-- <img class="coming-soon__logo" src="@/assets/logo_transparent_full.svg" alt="logo" /> -->
    <LogoAnimated />
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
  components: {
    LogoAnimated: () => import('@/components/LogoAnimated.vue'),
  },
  data: () => ({
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
        site: '@itsnachonight',
        creator: '@itsnachonight',
      },
      url: 'https://nachonight.tv/coming-soon',
    },
  }),
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
