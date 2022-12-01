let serverUrl = "http://localhost:51310";
export let aasIDs = [];
export let firstRender = false;

export function request() { //speichert alle ids der shells auf der server ab
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