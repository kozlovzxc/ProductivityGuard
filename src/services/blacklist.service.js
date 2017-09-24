/* global chrome */

function getHostname (url) {
  let link = document.createElement('a')
  link.href = url
  return link.hostname
};

const blacklist = {
  namespaced: true,
  state: {
    urls: []
  },
  actions: {
    fetchData: function (context) {
      chrome.storage.sync.get('blacklistedUrls', function (result) {
        context.state.urls = result['blacklistedUrls']
      })
    },
    addCurrentUrl: function (context) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentHostname = getHostname(tabs[0].url)
        chrome.storage.sync.get('blacklistedUrls', function (result) {
          context.state.urls = result['blacklistedUrls']
          if (context.state.urls) {
            if (context.state.urls.indexOf(currentHostname) === -1) {
              context.state.urls.push(currentHostname)
            } else {
              alert('Current url is in the list')
            }
          } else {
            context.state.urls = [currentHostname]
          }
          chrome.storage.sync.set({blacklistedUrls: context.state.urls}, function () {
            alert('Current url has been added')
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
          context.state.urls = result['blacklistedUrls']
          if (context.state.urls) {
            let index = context.state.urls.indexOf(blacklistedHostname)
            if (index !== -1) {
              context.state.urls.splice(index, 1)
            } else {
              return
            }
          }
          chrome.storage.sync.set({blacklistedUrls: context.state.urls})
          chrome.tabs.update(tabs[0].id, {'url': blacklistedUrl})
        })
      })
    }
  }
}

export default blacklist
