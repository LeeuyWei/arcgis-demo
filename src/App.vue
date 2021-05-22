<template>
  <div id="app">
    <router-view class="router-view"></router-view>
  </div>
</template>
<script>
export default {
  methods: {

  },
};
</script>
<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .router-view{
    height: 100%;
    width: 100%;
  }
}

</style>
