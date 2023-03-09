import {reload} from "./index";

let serverUrl = "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org";
export let shells = []; //speicher infos zu allen shells auf dem server ab

export function getAllShells() {//speichert alle ids der shells auf der server ab
    let request = new XMLHttpRequest();
    request.open("GET", serverUrl + "/shells");
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let json = JSON.parse(request.responseText);
                console.log("Alle Infos");
                console.log(json);

                for (let i = 0; i < json.length; i++) { //ließt die antwort aus und speichert wichtige infos in ein array
                    let tempJson = json[i];
                    let shell = [tempJson["idShort"], tempJson["id"], tempJson["submodels"]];
                    shells.push(shell);
                }
                reload(); //lädt die seite neu, sobald alle daten gespeichert wurden
            } else {
                console.log(request.response);
                alert("Request failed");
            }
        }
    }
}

export async function getShell(id) { //erweiterte Infos zu einer spezifischen shell
    return await fetch(serverUrl + "/shells/" + btoa(shells[findIndexOfIdShort(id)][1]))
        .then(response => response.text());
}

function findIndexOfIdShort(id) { //ermittelt den Index im shells array von einer IDShort
    for (let i = 0; i < shells.length; i++) {
        if (shells[i][0] === id) {
            return i;
        }
    }
    return -1;
}
