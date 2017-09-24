/* global chrome */

import { getHostname } from '../common'

const blacklist = {
  namespaced: true,
  state: {
    urls: []
  },
  actions: {
    fetchData: function (context) {
      return new Promise((resolve, reject) => {
        chrome.storage.sync.get('blacklistedUrls', function (result) {
          context.state.urls = result['blacklistedUrls']
          resolve()
        })
      })
    },
    notifyBackground: function (context) {
      chrome.runtime.sendMessage({
        cmd: 'update'
      })
    },
    addCurrentUrl: function (context) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentHostname = getHostname(tabs[0].url)
        if (currentHostname === getHostname(chrome.runtime.getURL('/'))) {
          alert('You cant add url of this extension')
          return
        }
        chrome.storage.sync.get('blacklistedUrls', function (result) {
          let blacklistedUrls = result['blacklistedUrls']
          if (blacklistedUrls) {
            if (blacklistedUrls.indexOf(currentHostname) === -1) {
              blacklistedUrls.push(currentHostname)
            } else {
              alert('Current url is in the list')
            }
          } else {
            blacklistedUrls = [currentHostname]
          }
          chrome.storage.sync.set({blacklistedUrls: blacklistedUrls}, function () {
            context.state.urls = blacklistedUrls
            context.dispatch('notifyBackground')
          })
          chrome.tabs.update(tabs[0].id, {'url': '/index.html#/nope/' + encodeURIComponent(tabs[0].url)})
        })
      })
    },
    deleteCurrentUrl: function (context) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const blacklistedUrl = decodeURIComponent(tabs[0].url.substr(tabs[0].url.lastIndexOf('/') + 1))
        const blacklistedHostname = getHostname(blacklistedUrl)
        chrome.storage.sync.get('blacklistedUrls', function (result) {
          let blacklistedUrls = result['blacklistedUrls']
          if (blacklistedUrls) {
            let index = blacklistedUrls.indexOf(blacklistedHostname)
            if (index !== -1) {
              blacklistedUrls.splice(index, 1)
            } else {
              return
            }
          }
          chrome.storage.sync.set({blacklistedUrls}, function () {
            context.state.urls = blacklistedUrls
            context.dispatch('notifyBackground')
          })
          chrome.tabs.update(tabs[0].id, {'url': blacklistedUrl})
        })
      })
    }
  }
}

export default blacklist
