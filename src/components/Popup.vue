<template>
  <div class="hello">
    <p>
      <el-button @click="addCurrentUrl">Add current hostname <i class="el-icon-plus"></i></el-button>
    </p>
    <p>
      <el-button @click="deleteCurrentUrl">Delete current hostname <i class="el-icon-delete"></i></el-button>
    </p>
    <h3>Blacklisted hostnames:</h3>
    <el-row v-for="hostname in blacklist.hostnames" :key="hostname">
        <el-col :span="18" :key="hostname">
          {{ hostname }}
        </el-col>
        <el-col :span="6" :key="hostname">
          <i @click="(event) => deleteUrl(hostname)" class="el-icon-close"></i>
        </el-col>
    </el-row>
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
    deleteUrl (hostname) {
      this.$store.dispatch('blacklist/deleteHostname', hostname)
    }
  }
}
</script>

<style style="scss" scoped>
</style>
