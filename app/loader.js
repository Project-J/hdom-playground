
function loadSound(url) {
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        request.open("get", url, true);
        request.responseType = "arraybuffer";
        request.onload = function() {
            resolve(request.response);
        };
        request.onerror = reject;
        request.send();
    });
}

module.exports = {
    loadSound
};