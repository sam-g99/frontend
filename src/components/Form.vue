<template>
  <form @submit.prevent="action">
    <input
      v-if="!submitted"
      ref="email"
      class="email"
      type="email"
      name="email"
      placeholder="Enter your email"
      required="true"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <Success :submitted="submitted" />
    <button v-if="!submitted" type="submit" class="notify">Notify Me!</button>
  </form>
</template>

<script>
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Success from '@/components/Success';

export default {
  components: { Success },
  props: {
    submitted: {
      type: Boolean,
      default: false,
    },
    action: {
      type: Function,
      default: () => 1,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

form {
  align-items: center;
  display: flex;
  flex-flow: column;
  margin-top: 30px;
  max-width: 500px;
  width: 100%;

  @include breakpoint(375) {
    margin-top: 35px;
  }

  @include breakpoint-height(750) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  @include breakpoint($desktop) {
    .notify {
      margin-left: auto;
      width: 220px;
    }
  }
}

.email {
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

.notify {
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

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #3d3d3d;
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #3d3d3d;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #3d3d3d;
}
</style>
