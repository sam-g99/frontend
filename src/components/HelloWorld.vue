<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>This project is under development.</p>
    <p>
      Check out Organization Github @
      <a href="https://github.com/NachoNight" target="_blank" rel="noopener noreferrer"
        >NachoNight</a
      >
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: { type: String, default: '' },
  },
  methods: {
    hello() {
      console.log('Hello World!');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
* {
  line-height: 2;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
