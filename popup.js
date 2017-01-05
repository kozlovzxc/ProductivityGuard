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
            chrome.storage.sync.set(result);
            alert("Current url has been added");
            chrome.tabs.update(tabs[0].id, {"url": "nope.html#"+tabs[0].url});
        });
    });
}

function showForbiddenHostnames()
{
    chrome.storage.sync.get('forbidden_hostnames', function(result){
        alert(JSON.stringify(result['forbidden_hostnames']));
    });
}

window.onload = function()
{
    $("#add").click(addCurrentUrl);
    $("#show").click(showForbiddenHostnames);
}
