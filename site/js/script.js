console.log("NjordanUpdateWrapper Started!");

const rootPluginUrl = "https://update.sbis.ru/Sbis3Plugin"
const rootOpenVpnUrl = "https://update.sbis.ru/openvpn"

function GetJsonContent (url, onLoad) {
    const req = new XMLHttpRequest();
    req.open("GET", url, true)
    req.send(null);
    req.onload = () => {
        onLoad(req.response, url);
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

function CreateCrumbFragment (curUrl) {
    const breadcrumbFragment = document.createDocumentFragment();

    const firstCrumb = document.createElement("li");
    firstCrumb.classList.add("breadcrumb-item");
    const attr = document.createElement("a");    
    attr.href = "#home";
    attr.textContent = String(rootPluginUrl).split("/").pop();
    attr.onclick = function () {
        OnDirClicked(rootPluginUrl);
    };
    firstCrumb.appendChild(attr);

    breadcrumbFragment.appendChild(firstCrumb);

    let urlTmp = rootPluginUrl;
    String(curUrl).substring(rootPluginUrl.length + 1).split("/").forEach(element => {
        const anotherCrumb = document.createElement("li");
        anotherCrumb.classList.add("breadcrumb-item");
        const attr = document.createElement("a"); 
        attr.href = `#${element}`;
        attr.textContent = element;
        const constUrl = `${urlTmp}/${element}`;
        attr.onclick = () => {
            OnDirClicked(constUrl);
        };
        anotherCrumb.appendChild(attr);

        urlTmp += `/${element}`;

        breadcrumbFragment.appendChild(anotherCrumb);
    });

    return breadcrumbFragment;
}

function BuildTableByJson (jsonData, curUrl) {
    const json = JSON.parse(jsonData);
    const mainTable = document.getElementById("MainTable");
    const mainBreadcrumb = document.getElementById("MainBreadcrumb");
    const tableFragment = document.createDocumentFragment();
    json.forEach(part => {
        //Пропускаем архивы. Могут быть сложности из-за количества, а пользы от них мало.
        // if(String(part.name).endsWith(".7z"))
        //     return;

        const row = document.createElement("tr");
        row.style.transform = "rotate(0)"

        const nameField = document.createElement("td");
        nameField.textContent = part.name;
        const attr = document.createElement("a");
        attr.classList.add("stretched-link");
        attr.href = "#";
        nameField.appendChild(attr);

        const typeField = document.createElement("td");
        typeField.textContent = part.type;
        const mtimeField = document.createElement("td");
        mtimeField.textContent = part.mtime;
        const sizeField = document.createElement("td");
        sizeField.textContent = part.size ? part.size : "-";

        const onClickCall = function () {
            if("file" === part.type)
                window.open(`${curUrl}/${part.name}`, '_blank').focus()
            else if("directory" === part.type)
                OnDirClicked(`${curUrl}/${part.name}`);
        }

        nameField.onclick = onClickCall;
        typeField.onclick = onClickCall;
        sizeField.onclick = onClickCall;
        mtimeField.onclick = onClickCall;

        row.appendChild(nameField);
        row.appendChild(typeField);
        row.appendChild(sizeField);
        row.appendChild(mtimeField);

        tableFragment.appendChild(row);
    });

    ClearChilds(mainTable);
    ClearChilds(mainBreadcrumb);

    mainBreadcrumb.appendChild(CreateCrumbFragment(curUrl));
    mainTable.appendChild(tableFragment);

    localStorage.setItem("lastPath", curUrl);
}

function DefaultView () {
    GetJsonContent(rootPluginUrl, BuildTableByJson)
}

function OnDirClicked (url) {
    GetJsonContent(url, BuildTableByJson)
}

function OnFileClicked (url) {
    DownloadFile(url)
}

function OpenRecent () {
    const lastPath = localStorage.getItem("lastPath");
    if(lastPath)
        OnDirClicked(lastPath);
    else
        DefaultView();
}

OpenRecent();