<template>
  <div class="video-player">
    <video ref="mainVideo" class="video-player__video" :src="vidSrc" autoplay muted></video>
    <Controls />
    <div class="video-player__layer"></div>
  </div>
</template>

<script>
import Controls from './Controls';

export default {
  components: {
    Controls,
  },
  data: () => {
    return {
      vidSrc:
        'https://redirector.googlevideo.com/videoplayback?expire=1572069794&ei=gsWzXZndFYze-AX4urSYCg&ip=144.217.69.47&id=47f06869ac7dba89&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-25glen7y&ms=nxu&mv=m&mvi=1&pl=22&sc=yes&ttl=transient&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=1420.039&lmt=1572006759337100&mt=1572062491&sparams=expire,ei,ip,id,itag,source,requiressl,ttl,susc,app,mime,cnr,dur,lmt&sig=ALgxI2wwRQIhAOWDjcvaJjpjyJnE_OozkEelld1fieNb6p4EWzxyDCykAiBHbrkPIzfdCUuG7xp69LfE4Jmz-LGrM4ppEbN_H5o7SQ==&lsparams=mm,mn,ms,mv,mvi,pl,sc&lsig=AHylml4wRgIhALRZ1yyS_nKA9nsGzCGyQzEGwpc2Ylm0bRWa375V1XxAAiEAtLBwgAJo1C7I3YS7S_tIky59Q2gxNNJpK_R83iI5hrc=&jparams=MjQuMTkzLjEyOS40NQ&upx=TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NDsgcnY6NzAuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC83MC4w#betaHost&tr=2',
    };
  },
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
  }

  &__layer {
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &__controls {
    bottom: 10px;
    position: absolute;
  }
}
</style>
