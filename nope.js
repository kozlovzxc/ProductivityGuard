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

$(document).ready(function() {
    $("#proceedButton").click(removeCurrentUrl);
    setTimeout(function(){$("#proceedButton").prop("disabled", false)}, 15*1000);
});
