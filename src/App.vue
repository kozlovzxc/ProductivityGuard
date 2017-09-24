<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '../node_modules/element-ui/lib/theme-default/index.css';

$primary-color: #58B7FF;

* {
  padding: 5px;
}

body {
  min-width: 300px;
  min-height: 300px;
}

a {
  color: #42b983;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 20px;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
