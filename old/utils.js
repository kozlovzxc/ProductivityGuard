function getHostname(url)
{
    var parser = document.createElement('a');
    parser.href = url
    return parser.hostname
}

function addCurrentUrl()
{
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
        current_hostname = getHostname(tabs[0].url);
        chrome.storage.sync.get('forbidden_hostnames', function(result){
            forbidden_hostnames = result['forbidden_hostnames'];
            if (forbidden_hostnames)
                if ($.inArray(current_hostname, forbidden_hostnames) === -1)
                    forbidden_hostnames.push(current_hostname);
                else
                    alert('Current url is in the list');
            else
                forbidden_hostnames = [current_hostname];
            chrome.storage.sync.set({'forbidden_hostnames': forbidden_hostnames}, function() {
              alert("Current url has been added");
            });
            chrome.tabs.update(tabs[0].id, {"url": "nope.html#"+tabs[0].url});
        });
    });
}

function removeCurrentUrl(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
        current_url = tabs[0].url.substr(tabs[0].url.indexOf("#")+1)
        current_hostname = getHostname(current_url);
        chrome.storage.sync.get('forbidden_hostnames', function(result){
            forbidden_hostnames = result['forbidden_hostnames'];
            if (forbidden_hostnames)
            {
                index = $.inArray(current_hostname, forbidden_hostnames);
                if (index !== -1)
                    forbidden_hostnames.splice(index,1);
            }
            chrome.storage.sync.set(result);
            chrome.tabs.update(tabs[0].id, {"url": current_url});
        });
    });
}

function removeAllUrls() {
    chrome.storage.sync.get('forbidden_hostnames', function(result){
        result['forbidden_hostnames'] = [];
        chrome.storage.sync.set(result);
    });
}