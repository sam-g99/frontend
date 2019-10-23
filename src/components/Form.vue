<template>
  <form @submit.prevent="action">
    <p v-if="this.$store.state.alert" class="alert">{{ $store.state.alert }}</p>
    <input
      ref="email"
      :class="{ comeOut: submitted }"
      class="email"
      type="email"
      name="email"
      placeholder="Enter your email"
      required="true"
      :disabled="submitted"
      @focus="isFocused = true"
      @keyup="updateEmail"
      @blur="updateEmail"
    />
    <Success :submitted="submitted" />
    <button :class="{ comeOut: submitted }" :disabled="submitted" type="submit" class="notify">
      {{ loading ? 'Verifying...' : 'Notify Me!' }}
    </button>
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
    loading: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      default: '',
    },
  },
  methods: {
    updateEmail(e) {
      this.$store.state.email = e.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.alert {
  background: rgb(255, 162, 162);
  border-radius: 5px;
  color: rgb(117, 15, 15);
  font-weight: 500;
  margin-bottom: 10px;
  padding: 5px;
  text-align: left;
  width: 100%;
}

form {
  align-items: center;
  display: flex;
  flex-flow: column;
  margin-bottom: 20px;
  margin-top: 30px;
  max-width: 500px;
  position: relative;
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
  transition: background-color 0.2s, transform 0.2s;
  width: 100%;
  @include breakpoint(375) {
    font-size: 20px;
    padding: 12px;
  }
  @include breakpoint($desktop) {
    &:hover {
      background: rgb(6, 126, 6);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.comeOut {
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  animation-name: come-out;
  animation-timing-function: ease-in-out;
}

@keyframes come-out {
  0% {
    opacity: 0.7;
    transform: translateX(-10px);
  }

  50% {
    opacity: 0;
    transform: translateX(-100px);
  }

  100% {
    opacity: 0;
    transform: translateX(-200px);
    visibility: hidden;
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
