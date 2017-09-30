/* global chrome */

const blacklist = {
  namespaced: true,
  state: {
    enabled: true
  },
  actions: {
    fetchData: function (context) {
      return new Promise((resolve, reject) => {
        chrome.storage.sync.get('status', function (result) {
          if (result['status']) {
            context.state.enabled = result['status'].enabled
            resolve()
          } else {
            // set default state
            chrome.storage.sync.set({
              status: context.state
            }, function () {
              resolve()
            })
          }
        })
      })
    },
    notifyBackground: function (context) {
      chrome.runtime.sendMessage({
        cmd: 'update',
        store: 'status'
      })
    },
    toggle: function (context) {
      chrome.storage.sync.get('status', function (result) {
        const status = result['status']
        // toggle status
        status.enabled = !status.enabled
        chrome.storage.sync.set({status}, function () {
          context.state.enabled = status.enabled
          context.dispatch('notifyBackground')
        })
      })
    }
  }
}

export default blacklist
