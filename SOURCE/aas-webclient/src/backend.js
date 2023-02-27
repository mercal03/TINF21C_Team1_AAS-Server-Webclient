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

export async function getShell(id) {
    return await fetch(serverUrl + "/shells/" + btoa(shells[findIndexOfIdShort(id)][1]))
        .then(response => response.text());
}

function findIndexOfIdShort(id) {
    for (let i = 0; i < shells.length; i++) {
        if (shells[i][0] === id) {
            return i;
        }
    }
    return -1;
}
