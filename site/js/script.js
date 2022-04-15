console.log("Hello Njordan!");

function getJSOriginal(){
    var req = new XMLHttpRequest();
    req.open("POST", "/jsondata", false);
    req.send(null);
    console.log(JSON.parse(req.responseText));
    // window.location.href = "/site/js/script.js";
}