console.log("NjordanUpdateWrapper Started!");

const rootPluginUrl = "https://update.sbis.ru/Sbis3Plugin"
const rootOpenVpnUrl = "https://update.sbis.ru/openvpn"

function GetJsonContent (url, onLoad) {
    const req = new XMLHttpRequest();
    req.open("GET", url, true)
    req.send(null);
    req.onload = () => {
        onLoad(req.response);
    };
}

function DownloadFile (url, onLoad) {
    const req = new XMLHttpRequest();
    req.open("GET", url, true)
    req.send(null);
}

function ClearChilds (element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

function BuildTableByJson (jsonData) {
    const json = JSON.parse(jsonData);
    const mainTable = document.getElementById("MainTable");
    ClearChilds(mainTable);
    const fragment = document.createDocumentFragment();
    json.forEach(part => {
        const row = document.createElement("tr");
        row.style.transform = "rotate(0)"

        const nameField = document.createElement("td");
        nameField.textContent = part.name;
        const attr = document.createElement("a");
        attr.classList.add("stretched-link");
        nameField.appendChild(attr);

        const typeField = document.createElement("td");
        typeField.textContent = part.type;
        const mtimeField = document.createElement("td");
        mtimeField.textContent = part.mtime;
        const sizeField = document.createElement("td");
        sizeField.textContent = part.size;

        row.appendChild(nameField);
        row.appendChild(typeField);
        row.appendChild(mtimeField);
        row.appendChild(sizeField);

        fragment.appendChild(row);
    });
    mainTable.appendChild(fragment);
}

function DefaultView () {
    GetJsonContent (rootPluginUrl, BuildTableByJson)
}

function OnDirClicked () {

}

function OnFileClicked () {

}