<template>
  <div class="connected-peers">
    <h3>Connected Users</h3>
    <p v-if="!users.length">None connected</p>
    <p v-for="user in users" :key="user.peerId">
      {{ user.name }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['users'],
};
</script>

<style lang="scss" scoped>
.connected-peers {
  color: white;

  p {
    margin-top: 10px;
    margin-right: 10px;
    background: #3a335e;
    padding: 15px;
    border-radius: 100px;
    width: auto;
    display: inline-block;
  }
}
</style>
