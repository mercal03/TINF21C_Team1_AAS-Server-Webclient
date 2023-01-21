import {reload} from "./index";

let serverUrl = "http://localhost:5001";
export let shells = [];

export function getAllShells() { //speichert alle ids der shells auf der server ab
    let request = new XMLHttpRequest();
    request.open("GET", serverUrl + "/shells");
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let json = JSON.parse(request.responseText);
                console.log("Alle Infos");
                console.log(json);

                for (let i = 0; i < json.length; i++) {
                    let tempJson = json[i];
                    let shell = [tempJson["idShort"], tempJson["id"], tempJson["submodels"]];
                    shells.push(shell);
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
    request.open("GET", serverUrl + "/shells/" + btoa(shells[findIndexOfIdShort(id)][1]));
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

function findIndexOfIdShort(id) {
    for (let i = 0; i < shells.length; i++) {
        if (shells[i][0] === id) {
            return i;
        }
    }
    return -1;
}