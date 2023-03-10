import {shells} from "./itemview";

// let serverUrl = "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org";
let serverUrl = "";

export async function getAllShells(url) {
    return await fetch(url + "/shells")
        .then(response => response.json());
}

export async function getShell(id) { //erweiterte Infos zu einer spezifischen shell
    return await fetch(serverUrl + "/shells/" + btoa(shells[findIndexOfIdShort(id)]["id"]))
        .then(response => response.text());
}

function findIndexOfIdShort(id) { //ermittelt den Index im shells array von einer IDShort
    for (let i = 0; i < shells.length; i++) {
        if (shells[i]["idShort"] === id) {
            return i;
        }
    }
    return -1;
}
