/* global chrome */
import store from './store.service'
import { getHostname } from './common'

store.dispatch('blacklist/fetchData')

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.cmd === 'update') {
      console.log('updating')
      store.dispatch('blacklist/fetchData')
    } else {
      console.log(`unknown command: ${request.cmd}`)
    }
    // Note: Returning true is required here!
    //  ref: http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
    return true
  })

const checkTab = function (tab) {
  if (!tab.url) {
    return
  }
  if (store.state.blacklist.urls && store.state.blacklist.urls.indexOf(getHostname(tab.url)) !== -1) {
    chrome.tabs.update(tab.id, {'url': '/index.html#/nope/' + encodeURIComponent(tab.url)})
  }
}
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  checkTab(tab)
})
chrome.tabs.onCreated.addListener(function (tab) {
  checkTab(tab)
})
chrome.tabs.onReplaced.addListener(function (tabId, changeInfo, tab) {
  checkTab(tab)
})
