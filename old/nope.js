$(document).ready(function () {
    $("#proceedButton").click(function () {
        removeCurrentUrl();
        setTimeout(addCurrentUrl(), 5 * 60 * 1000); // add current Url after 5 minutes timeout
    });
});
