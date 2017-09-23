function showForbiddenHostnames()
{
    chrome.storage.sync.get('forbidden_hostnames', function(result){
        alert(JSON.stringify(result['forbidden_hostnames']));
    });
}

window.onload = function()
{
    $("#add").click(addCurrentUrl);
    $("#remove").click(removeCurrentUrl);    
    $("#show").click(showForbiddenHostnames);
    $("#clear").click(removeAllUrls);
}
