/* global chrome */
import store from './store.service'
import { getHostname } from './common'

const checkTab = function (tab) {
  if (!tab.url) {
    return
  }
  const extensionHostname = getHostname(chrome.runtime.getURL('/'))
  const currentHostname = getHostname(tab.url)
  if (store.state.blacklist.hostnames.indexOf(currentHostname) !== -1) {
    chrome.tabs.update(tab.id, {'url': '/index.html#/nope/' + encodeURIComponent(tab.url)})
  } else if (currentHostname === extensionHostname) {
    const blacklistedUrl = decodeURIComponent(tab.url.substr(tab.url.lastIndexOf('/') + 1))
    const blacklistedHostname = getHostname(blacklistedUrl)
    if (store.state.blacklist.hostnames.indexOf(blacklistedHostname) === -1) {
      chrome.tabs.update(tab.id, {'url': blacklistedUrl})
    }
  }
}

const checkTabs = function (tab) {
  chrome.tabs.query({}, function (tabs) {
    for (let tab of tabs) {
      checkTab(tab)
    }
  })
}

store.dispatch('blacklist/fetchData')
  .then(checkTabs)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd === 'update') {
    store.dispatch('blacklist/fetchData')
      .then(checkTabs)
  } else {
    console.log(`unknown command: ${request.cmd}`)
  }
  // Note: Returning true is required here!
  //  ref: http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
  return true
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  checkTab(tab)
})
chrome.tabs.onCreated.addListener(function (tab) {
  checkTab(tab)
})
chrome.tabs.onReplaced.addListener(function (tabId, changeInfo, tab) {
  checkTab(tab)
})
