function checkTab(tab){
	if (!tab.url)
        return;

    hostname = getHostname(tab.url)
    chrome.storage.sync.get('forbidden_hostnames', function(result){
        if (result['forbidden_hostnames'])
            for (i = 0; i < result['forbidden_hostnames'].length; i++)
                if (hostname.toLowerCase().indexOf(result['forbidden_hostnames'][i]) !== -1)
                    chrome.tabs.update(tab.id, {"url": "nope.html#"+tab.url});
    });
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {          
    checkTab(tab);
}); 

chrome.tabs.onCreated.addListener(function(tab) {         
    checkTab(tab);
});

chrome.tabs.onReplaced.addListener(function(tabId, changeInfo, tab)
{
    checkTab(tab);
});
