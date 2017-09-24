<template>
  <h1>{{ $route.params.url }} is forbidden</h1>
</template>

<script>
export default {
  name: 'nope',
  data () {
    return {
      msg: 'Nope!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style style="scss">
</style>
