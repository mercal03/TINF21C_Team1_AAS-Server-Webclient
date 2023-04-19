// let serverUrl = "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org";

import {index, Main} from "./index";
import {responsivePropType} from "react-bootstrap/createUtilityClasses";

async function getData(url) {
    console.log("Get data of:");
    console.log(url);
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

async function findSubmodels(url, category) {
    console.log("Find Submodels");
    return getData(url + "submodels?level=Deep").then(response => {
        return response.filter(element => {
            if (element.idShort) {
                return element.idShort === category;
            } else {
                return false;
            }
        }).map(element => {
            if (Object.keys(element).includes("identification")) { //V1
                let id = element.identification.id;
                return {
                    idShort: element.idShort,
                    id: id,
                    idEncoded: btoa(id),
                    ...extractData(element.submodelElements, id),
                }
            } else { //V3
                return {
                    idShort: element.idShort,
                    id: element.id,
                    idEncoded: btoa(element.id),
                    ...extractDatav3(element.submodelElements, element.id),
                }
            }
        });
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

function extractDatav3(element, id, path = "") {
    let url = window.sessionStorage.getItem("url");
    url += "submodels/" + btoa(id) + "/submodelelements";
    let returnObject = {};

    for (let nameplateElement of element) {
        if (nameplateElement.modelType === "MultiLanguageProperty") {
            returnObject[nameplateElement.idShort] = getLangString(nameplateElement.value);
        } else if (nameplateElement.modelType === "SubmodelElementCollection") {
            returnObject[nameplateElement.idShort] = extractDatav3(nameplateElement.value, id, path + (path.length > 0 ? "." : "") + nameplateElement.idShort);
        } else if (nameplateElement.modelType === "Property") {
            returnObject[nameplateElement.idShort] = nameplateElement.value;
        } else if (nameplateElement.modelType === "File") {
            returnObject["FilePath"] = url + "/" + path + "." + nameplateElement.idShort + "/attachment";
            returnObject[nameplateElement.idShort] = nameplateElement.value;
        }
    }
    return returnObject;
}

function extractData(element, id, path = "") {
    let url = window.sessionStorage.getItem("url");
    url += "submodels/" + btoa(id) + "/submodelelements";
    let returnObject = {};

    for (let nameplateElement of element) {
        if (nameplateElement.modelType.name === "MultiLanguageProperty") {
            returnObject[nameplateElement.idShort] = getLangString(nameplateElement.value);
        } else if (nameplateElement.modelType.name === "SubmodelElementCollection") {
            returnObject[nameplateElement.idShort] = extractData(nameplateElement.value, id, path + (path.length > 0 ? "." : "") + nameplateElement.idShort);
        } else if (nameplateElement.modelType.name === "Property") {
            returnObject[nameplateElement.idShort] = nameplateElement.value;
        } else if (nameplateElement.modelType.name === "File") {
            returnObject["FilePath"] = url + "/" + path + "." + nameplateElement.idShort + "/attachment";
            returnObject[nameplateElement.idShort] = nameplateElement.value;
        }
    }
    return returnObject;
}

function searchForKeyv3(json, regex) {
    let returnList = [];
    if (typeof json === "object") {
        for (let key in json) {
            if (regex.test(key) && json["FilePath"]) {
                returnList.push(json["FilePath"]);
            }
            returnList = returnList.concat(searchForKeyv3(json[key], regex));
        }
    }
    return returnList;
}

async function getFullShellData() {
    let url = window.sessionStorage.getItem("url");
    let fullData = [];
    let data = [];
    const dataStrings = [
        "Nameplate",
        "TechnicalData",
    ];
    for (let i = 0; i < dataStrings.length; i++) {
        fullData[i] = null;
        data[i] = null;
    }
    if (!url.endsWith("/")) {
        url += "/";
        window.sessionStorage.setItem("url", url);
    }

    for (let i = 0; i < fullData.length; i++) {
        if (fullData[i] === null) {
            await findSubmodels(url, dataStrings[i]).then(response => fullData[i] = response);
        }
    }

    getData(url + "shells").then(response => {
        let returnData = response.map(element => {
            let id;
            if (Object.keys(element).includes("identification")) {
                console.log("Server is V1");
                id = element.identification.id;
            } else {
                console.log("Server is V3");
                id = element.id;
            }

            for (let i = 0; i < fullData.length; i++) {
                if (fullData[i] !== null) {
                    data[i] = fullData[i].find(item => {
                        return element.submodels ? element.submodels.find(submodel => {
                            return submodel.keys[0] ? item.id === submodel.keys[0].value : false;
                        }) : false;
                    });
                }
            }

            let images;
            if (!Object.keys(element).includes("identification")) {
                images = data[1] ? searchForKeyv3(data[1], /[pP]roductImage\d*/) : null;
            }

            let returnElement = {
                idShort: element.idShort,
                id: id,
                idEncoded: btoa(id),
                image: images ? images[0] : null,
            }

            for (let i = 0; i < dataStrings.length; i++) {
                returnElement[dataStrings[i]] = data[i] ? data[i] : null;
            }

            return returnElement;
        });
        console.log(returnData);
        window.sessionStorage.setItem("shells", JSON.stringify(returnData));
        window.sessionStorage.setItem("content", JSON.stringify(returnData));
        index.render(<Main/>);
    }).catch(err => alert(err));
}

async function loadBody(shell) {
    let url = window.sessionStorage.getItem("url");
    url += "shells/" + btoa(shell.id) + "/submodels"
    let ids = [];
    await getData(url).then(response => {
        for (let i = 0; i < response.length; i++) {
            ids.push(response[i]["keys"][0]["value"])
        }
    });
    for (let i = 0; i < ids.length; i++) {
        await loadSubmodel(ids[i], url).then(response => {
            shell[response.idShort] = response;
        });
    }
    return shell;
}

async function loadSubmodel(id, url) {
    url += "/" + btoa(id) + "/submodel"
    return getData(url).then(element => {
        if (Object.keys(element).includes("identification")) { //V1
            let id = element.identification.id;
            return {
                idShort: element.idShort,
                id: id,
                idEncoded: btoa(id),
                ...extractData(element.submodelElements, id),
            }
        } else { //V3
            return {
                idShort: element.idShort,
                id: element.id,
                idEncoded: btoa(element.id),
                ...extractDatav3(element.submodelElements, element.id),
            }
        }
    });
}

export {getFullShellData, loadBody}