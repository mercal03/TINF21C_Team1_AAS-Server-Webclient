import {reload} from "./index";

let serverUrl = "http://localhost:5001";
export let aasIDs = [];

export function getAllShells() { //speichert alle ids der shells auf der server ab
    let request = new XMLHttpRequest();
    request.open("GET", serverUrl + "/shells");
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let json = JSON.parse(request.responseText);

                for (let i = 0; i < json.length; i++) {
                    aasIDs.push(json[i]["idShort"]);
                }
                reload();
            } else {
                alert("Request failed");
            }
        }
    }
}

export function getShell(event) {
    let id = event.target.innerHTML;
    let request = new XMLHttpRequest();
    request.open("GET", serverUrl + "/shells/" + id);
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let json = JSON.parse(request.responseText);
                //Gibt JSON mit allen Daten zu der Shell
                console.log(json);
            } else {
                alert("Request failed");
            }
        }
    }
}

export function getShellThumbnail(id) {
    let request = new XMLHttpRequest();
    request.open("GET", serverUrl + "/aas/" + id + "/thumbnail");
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                //Gibt ein Bild zurück
                console.log(request.response);
            } else {
                alert("Request failed");
            }
        }
    }
}

export function getSubmodel(id, subId) { //ehrlich gesagt weiß ich noch nie ganz wie dieser api call funktioniert
    let request = new XMLHttpRequest();
    request.open("GET", serverUrl + "/aas/" + id + "/submodels/" + subId);
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let json = JSON.parse(request.responseText);
                console.log(json);
            } else {
                alert("Request failed");
            }
        }
    }
}