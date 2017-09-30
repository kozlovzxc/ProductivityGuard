<template>
  <div class="hello">
    <el-switch
      v-model="switcher"
      on-color="#13ce66"
      off-color="#ff4949">
    </el-switch>
    <template v-if="status.enabled">
      <p>
        <el-button class="button_action" @click="addCurrentUrl">
          Add current hostname <i class="el-icon-plus"></i>
        </el-button>
      </p>
      <p>
        <el-button class="button_action" @click="deleteCurrentUrl">
          Delete current hostname <i class="el-icon-delete"></i>
        </el-button>
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
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'popup',
  computed: {
    switcher: {
      get () {
        return this.$store.state.status.enabled
      },
      set (value) {
        this.$store.dispatch('status/toggle')
      }
    },
    ...mapState({
      blacklist: state => state.blacklist,
      status: state => state.status
    })
  },
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
.button_action {
  width: 100%;
}
</style>
