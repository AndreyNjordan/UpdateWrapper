console.log("UpdateWrapper running!");

function TestFunc () {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open("POST", "/jsondata", false);
        req.send(null);
        resolve(req.responseText);
    })
}

function LogResponse () {
    console.log(this.responseText);
    console.log(this.response);
}

function GetPluginUpdateContent () {
    const req = new XMLHttpRequest();
    req.open("GET", "http://update.sbis.ru/Sbis3Plugin", true)
    req.send(null);
    req.onload = LogResponse;
}