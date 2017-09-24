<template>
  <div class="hello">
    <h3>Blacklisted urls:</h3>
    <el-row v-for="url in blacklist.urls" :key="url">
        <el-col :span="18" :key="url">
          {{ url }}
        </el-col>
        <el-col :span="6" :key="url">
          <i @click="(event) => deleteUrl(url)" class="el-icon-close"></i>
        </el-col>
    </el-row>
    <p>
      <el-button @click="addCurrentUrl">Add current url <i class="el-icon-plus"></i></el-button>
    </p>
    <p>
      <el-button @click="deleteCurrentUrl">Delete current url <i class="el-icon-delete"></i></el-button>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'popup',
  computed: mapState({
    blacklist: state => state.blacklist
  }),
  methods: {
    addCurrentUrl () {
      this.$store.dispatch('blacklist/addCurrentUrl')
    },
    deleteCurrentUrl () {
      this.$store.dispatch('blacklist/deleteCurrentUrl')
    },
    deleteUrl (url) {
      this.$store.dispatch('blacklist/deleteUrl', url)
    }
  }
}
</script>

<style style="scss" scoped>
</style>
