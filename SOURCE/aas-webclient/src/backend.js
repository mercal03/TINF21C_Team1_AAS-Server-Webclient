// let serverUrl = "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org";

import {index, Main} from "./index";

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
            console.log(err);
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
            return {
                idShort: element.idShort,
                id: element.id,
                idEncoded: btoa(element.id),
                ...extractData(element["submodelElements"]),
            }
        });
    });
}

function getLangString(json) {
    if ("langStrings" in json){
        let langStrings = json.langStrings
        for (let langPref of ["de", "en"]){
            for (let langString of langStrings) {
                if(langString.language === langPref){
                    return langString.text;
                }
            }
        }
    }
    return "";
}

function extractData(element, path = "") {
    let url = window.sessionStorage.getItem("url");
    url += "submodels/" + btoa(element.id) + "/submodelelements"
    let returnObject = {};

    for (let nameplateElement of element) {
        if (nameplateElement.modelType === "MultiLanguageProperty") {
            returnObject[nameplateElement.idShort] = getLangString(nameplateElement.value);
        } else if (nameplateElement.modelType === "SubmodelElementCollection") {
            returnObject[nameplateElement.idShort] = extractData(nameplateElement.value, path + (path.length > 0 ? "." : "") + nameplateElement.idShort);
        } else if (nameplateElement.modelType === "Property") {
            returnObject[nameplateElement.idShort] = nameplateElement.value;
        } else if (nameplateElement.modelType === "File") {
            returnObject["FilePath"] = url + "/" + path + "." + nameplateElement.idShort + "/attachment";
            returnObject[nameplateElement.idShort] = nameplateElement.value;
        }
    }
    return returnObject;
}

function searchForKey(json){
    let regex = /[pP]roductImage\d*/;
    let returnList = []
    if(typeof json === "object") {
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
    let fullnameplateData = null, fulltechnicalData = null;
    if (!url.endsWith("/")) {
        url += "/";
        window.sessionStorage.setItem("url", url);
    }
    if (fullnameplateData === null) {
        await findSubmodels(url, "Nameplate").then(response => fullnameplateData = response);
        console.log(fullnameplateData);
    }
    if (fulltechnicalData === null) {
        await findSubmodels(url, "TechnicalData").then(response => fulltechnicalData = response);
        console.log(fulltechnicalData);
    }

    getData(url + "shells").then(response => {
        let returnData = response.map(element => {
            let id = element["id"];

            let nameplateData = fullnameplateData.find(item => {
                return element.submodels.find(submodel => {
                    return item.id === submodel.keys[0].value;
                });
            });

            let technicalData = fulltechnicalData.find(item => {
                return element.submodels.find(submodel => {
                    return item.id === submodel.keys[0].value;
                });
            });

            let images = technicalData ? searchForKey(technicalData) : null;

            return {
                idShort: element.idShort,
                id: id,
                idEncoded: btoa(id),
                nameplateId: nameplateData ? nameplateData.id : null,
                nameplateIdEncoded: nameplateData ? nameplateData.idEncoded : null,
                images: images,
                nameplate: nameplateData ? nameplateData : null,
            }
        });
        window.sessionStorage.setItem("shells", JSON.stringify(returnData));
        window.sessionStorage.setItem("content", JSON.stringify(returnData));
        index.render(<Main/>);
    });
}

export {getFullShellData}