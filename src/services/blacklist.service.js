const blacklist = {
  namespaced: true,
  state: {
    urls: []
  },
  mutations: {
    addCurrentUrl: function (state) {
      state.urls.push('test')
    },
    deleteCurrentUrl: function (state) {
      state.urls.pop()
    }
  }
}

export default blacklist
