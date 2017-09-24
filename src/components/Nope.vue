<template>
  <h1 id="forbidden">{{ $route.params.url }} is forbidden</h1>
</template>

<script>
export default {
  name: 'nope'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style style="scss" scoped>
#forbidden {
  text-align: center;
}
</style>
