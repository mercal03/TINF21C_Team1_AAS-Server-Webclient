import {index, Main} from "./index";

export let controller = new AbortController();

async function getData(url) {
    controller = new AbortController();
    // console.log("Get data of:");
    // console.log(url);
    return fetch(url, {
        signal: controller.signal
    })
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
            console.warn(err);
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
    let apiVersion;
    let url = window.sessionStorage.getItem("url");
    if (!url.endsWith("/")) {
        url += "/";
        window.sessionStorage.setItem("url", url);
    }

    let shells = await getData(url + "shells").then(response => {
        if (response !== undefined) {
            return response.map(element => {
                if (!apiVersion) {
                    if (element["submodels"][0]["type"]) {
                        apiVersion = 3;
                    } else {
                        apiVersion = 1;
                    }
                    console.log(apiVersion);
                }
                console.log(element);

                let id = apiVersion === 3 ? element.id : element.identification.id;

                let submodelIds = [];
                if (element.submodels) {
                    for (let i = 0; i < element.submodels.length; i++) {
                        if (element.submodels[i]["keys"][0]) {
                            submodelIds.push(element.submodels[i]["keys"][0]["value"]);
                        }
                    }
                }

                return {
                    idShort: element.idShort,
                    id: id,
                    idEncoded: btoa(id),
                    apiVersion: apiVersion,
                    submodels: submodelIds
                }
            });
        }
    }).catch(err => alert(err));

    if (shells !== undefined) {
        window.sessionStorage.setItem("shells", JSON.stringify(shells));
        window.sessionStorage.setItem("content", JSON.stringify(shells));
        index.render(<Main/>);

        console.log(shells);
        if (apiVersion === 3) {
            for (let i = 0; i < shells.length; i++) {
                await loadBody(shells[i]).then(shell => {
                    shells[i] = shell;
                });
                window.sessionStorage.setItem("shells", JSON.stringify(shells));
                window.sessionStorage.setItem("content", JSON.stringify(shells));
                index.render(<Main/>);
            }
        } else {
            alert("Api Version 1 not supported yet")
        }
        console.log(shells);
    }
}

async function loadBody(shell) {
    let url = window.sessionStorage.getItem("url");
    url += "shells/" + shell.idEncoded + "/submodels";
    // url += "shells/" + shell.idEncoded + "/aas/submodels"; V1

    for (let i = 0; i < shell.submodels.length; i++) {
        await loadSubmodel(shell.submodels[i], url).then(response => {
            if (response !== undefined) {
                shell[response.idShort] = response;
                let images = searchForKey(response, /[pP]roductImage\d*/);
                if (images.length > 0) {
                    shell["image"] = images[0];
                }
            }
        });
    }
    delete shell.submodels;
    return shell;
}

async function loadSubmodel(id, url) {
    url += "/" + btoa(id) + "/submodel"
    return getData(url).then(element => {
        if (element !== undefined) {
            return {
                idShort: element.idShort,
                id: element.id,
                idEncoded: btoa(element.id),
                ...extractData(element.submodelElements, element.id),
            }
        }
    });
}

export {getFullShellData, loadBody}