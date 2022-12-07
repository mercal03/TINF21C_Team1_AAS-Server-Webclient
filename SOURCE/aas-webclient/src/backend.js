let serverUrl = "http://localhost:51310";
export let aasIDs = [];
export let firstRender = false;

export function requestIDs() { //speichert alle ids der shells auf der server ab
    let request = new XMLHttpRequest();
    request.open("GET", serverUrl + "/server/listaas");
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let json = JSON.parse(request.responseText);
                let aaslist = json["aaslist"];

                for (let i = 0; i < aaslist.length; i++) {
                    let id = aaslist[i];
                    id = id.substring(id.search(":") + 2);
                    id = id.substring(0, id.search(":") - 1);
                    aasIDs.push(id);
                }
                firstRender = true;
            } else {
                alert("Request failed");
            }
        }
    }
}

export function getShell(id) {
    let request = new XMLHttpRequest();
    request.open("GET", serverUrl + "/aas/" + id + "/complete");
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let json = JSON.parse(request.responseText);
                console.log(id);
                console.log(json);
            } else {
                alert("Request failed");
            }
        }
    }
}

export function getSubmodel(id, subId) {
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