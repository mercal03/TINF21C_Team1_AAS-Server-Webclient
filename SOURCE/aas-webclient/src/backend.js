import {index, Main} from "./index";

async function getData(url) {
    // console.log("Get data of:");
    // console.log(url);
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fetch not ok");
            }
            return response.json().then(jsonResponse => {
                return jsonResponse;
            }).catch(err => {
                console.log(response, err);
            })
        }).catch(err => {
            window.sessionStorage.clear();
            document.getElementById("server-url").value = "";
            document.getElementById("addServerbtn").innerHTML = "Add Server";
            index.render(<Main/>);
            alert("Server nicht erreichbar");
        });
}

function getLangString(json) {
    if ("langStrings" in json) {
        let langStrings = json.langStrings
        for (let langPref of ["de", "en"]) {
            for (let langString of langStrings) {
                if (langString.language === langPref) {
                    return langString.text;
                }
            }
        }
    }
    return "";
}

function extractData(element, id, path = "") {
    let url = window.sessionStorage.getItem("url");
    url += "submodels/" + btoa(id) + "/submodelelements";
    let returnObject = {};

    for (let nameplateElement of element) {
        if (nameplateElement.modelType === "MultiLanguageProperty") {
            returnObject[nameplateElement.idShort] = getLangString(nameplateElement.value);
        } else if (nameplateElement.modelType === "SubmodelElementCollection") {
            returnObject[nameplateElement.idShort] = extractData(nameplateElement.value, id, path + (path.length > 0 ? "." : "") + nameplateElement.idShort);
        } else if (nameplateElement.modelType === "Property") {
            returnObject[nameplateElement.idShort] = nameplateElement.value;
        } else if (nameplateElement.modelType === "File") {
            returnObject["FilePath"] = url + "/" + path + "." + nameplateElement.idShort + "/attachment";
            returnObject[nameplateElement.idShort] = nameplateElement.value;
        }
    }
    return returnObject;
}

function searchForKey(json, regex) {
    let returnList = [];
    if (typeof json === "object") {
        for (let key in json) {
            if (regex.test(key) && json["FilePath"]) {
                returnList.push(json["FilePath"]);
            }
            returnList = returnList.concat(searchForKey(json[key], regex));
        }
    }
    return returnList;
}

async function getFullShellData() {
    let url = window.sessionStorage.getItem("url");
    if (!url.endsWith("/")) {
        url += "/";
        window.sessionStorage.setItem("url", url);
    }

    let shells = await getData(url + "shells").then(response => {
        return response.map(element => {
            let id = element.id;

            return {
                idShort: element.idShort,
                id: id,
                idEncoded: btoa(id),
            }
        });
    }).catch(err => alert(err));

    window.sessionStorage.setItem("shells", JSON.stringify(shells));
    window.sessionStorage.setItem("content", JSON.stringify(shells));
    index.render(<Main/>);

    for (let i = 0; i < shells.length; i++) {
        await loadBody(shells[i]).then(shell => {
            shells[i] = shell;
        });
    }
    console.log(shells);
    window.sessionStorage.setItem("shells", JSON.stringify(shells));
    window.sessionStorage.setItem("content", JSON.stringify(shells));
    index.render(<Main/>);
}

async function loadBody(shell) {
    let url = window.sessionStorage.getItem("url");
    url += "shells/" + shell.idEncoded + "/submodels"
    let ids = [];
    await getData(url).then(response => {
        if (response !== undefined) {
            for (let i = 0; i < response.length; i++) {
                if (response[i]["keys"].length > 0) {
                    ids.push(response[i]["keys"][0]["value"]);
                }
            }
        }
    });
    for (let i = 0; i < ids.length; i++) {
        await loadSubmodel(ids[i], url).then(response => {
            shell[response.idShort] = response;
            let images = searchForKey(response, /[pP]roductImage\d*/);
            if (images.length > 0) {
                shell["image"] = images[0];
            }
        });
    }
    return shell;
}

async function loadSubmodel(id, url) {
    url += "/" + btoa(id) + "/submodel"
    return getData(url).then(element => {
        return {
            idShort: element.idShort,
            id: element.id,
            idEncoded: btoa(element.id),
            ...extractData(element.submodelElements, element.id),
        }
    });
}

export {getFullShellData, loadBody}