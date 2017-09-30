/* global chrome */

import { getHostname } from '../common'

const blacklist = {
  namespaced: true,
  state: {
    enabled: true,
    hostnames: []
  },
  actions: {
    fetchData: function (context) {
      return new Promise((resolve, reject) => {
        chrome.storage.sync.get('blacklistedUrls', function (result) {
          context.state.hostnames = result['blacklistedUrls']
          resolve()
        })
      }).then(function () {
        return new Promise((resolve, reject) => {
          chrome.storage.sync.get('enabled', function (result) {
            context.state.enabled = result['enabled']
            resolve()
          })
        })
      })
    },
    notifyBackground: function (context) {
      chrome.runtime.sendMessage({
        cmd: 'update',
        store: 'blacklist'
      })
    },
    addHostname: function (context, hostname) {
      const extensionHostname = getHostname(chrome.runtime.getURL('/'))
      if (hostname === extensionHostname) {
        alert('You cant add url of this extension')
        return
      }
      chrome.storage.sync.get('blacklistedUrls', function (result) {
        let blacklistedUrls = result['blacklistedUrls']
        if (blacklistedUrls) {
          if (blacklistedUrls.indexOf(hostname) === -1) {
            blacklistedUrls.push(hostname)
          } else {
            alert('Current url is in the list')
            return
          }
        } else {
          blacklistedUrls = [hostname]
        }
        chrome.storage.sync.set({blacklistedUrls}, function () {
          context.state.hostnames = blacklistedUrls
          context.dispatch('notifyBackground')
        })
      })
    },
    deleteHostname: function (context, hostname) {
      chrome.storage.sync.get('blacklistedUrls', function (result) {
        let blacklistedUrls = result['blacklistedUrls']
        if (blacklistedUrls) {
          let index = blacklistedUrls.indexOf(hostname)
          if (index !== -1) {
            blacklistedUrls.splice(index, 1)
            chrome.storage.sync.set({blacklistedUrls}, function () {
              context.state.hostnames = blacklistedUrls
              context.dispatch('notifyBackground')
            })
          } else {
            alert(`there is no such hostname: ${hostname}`)
            return
          }
        }
      })
    },
    addCurrentUrl: function (context) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentHostname = getHostname(tabs[0].url)
        context.dispatch('addHostname', currentHostname)
      })
    },
    deleteCurrentUrl: function (context) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const blacklistedUrl = decodeURIComponent(tabs[0].url.substr(tabs[0].url.lastIndexOf('/') + 1))
        const blacklistedHostname = getHostname(blacklistedUrl)
        context.dispatch('deleteHostname', blacklistedHostname)
      })
    }
  }
}

export default blacklist
