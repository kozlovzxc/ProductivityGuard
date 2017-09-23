<template>
  <div id="app">
    <p>
      <router-link to="/">Index</router-link>
      <router-link to="/nope">Nope</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
import Popup from './components/Popup'

export default {
  name: 'app',
  components: {
    Popup
  }
}
</script>

<style lang="scss">
@import '../node_modules/element-ui/lib/theme-default/index.css';

body {
  min-width: 300px;
  min-height: 300px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
