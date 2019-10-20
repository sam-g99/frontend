<template>
  <div v-if="submitted" class="success">
    <h3>Congrats - Email Added</h3>
    <p>You'll be notified once we go live!</p>
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

.success {
  background: #fff;
  border-radius: 5px;
  color: $purple;
  flex-flow: column;
  height: 130px;
  max-width: 500px;
  padding: 10px;
  width: 100%;
  @include flex(center, center);

  h3 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  p {
    color: rgb(31, 31, 31);
    font-size: 22px;
  }
}
</style>
