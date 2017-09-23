<template>
  <div class="hello">
    <p>{{ count }}</p>
    <p>
      <button @click="addCurrentUrl">Add current</button>
      <button @click="deleteCurrentUrl">Delete current</button>
    </p>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'popup',
  computed: {
    count () {
      return this.$store.state.blacklist.urls
    }
  },
  methods: {
    addCurrentUrl () {
      this.$store.commit('blacklist/addCurrentUrl')
    },
    deleteCurrentUrl () {
      this.$store.commit('blacklist/deleteCurrentUrl')
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
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
