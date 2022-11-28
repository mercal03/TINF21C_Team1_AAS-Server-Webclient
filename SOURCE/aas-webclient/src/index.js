import React from 'react';
import ReactDOM from 'react-dom/client';

let serverUrl = "http://localhost:51310";
let aasIDs = [];

const index = ReactDOM.createRoot(document.getElementById('root'));
index.render(<div>
    <button onClick={request2}>Request</button>
</div>); //hier wird dann die seite an sich gerendert
request();


//Diese funktionen sollen wo anders hin, die sind nur testweise hier
function request() { //speichert alle ids der shells auf der server ab
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
            } else {
                alert("Request failed");
            }
        }
    }
}

function request2() { //informationen über eine shell
    let request = new XMLHttpRequest();
    request.open("GET", serverUrl + "/aas/" + aasIDs[0] + "/complete");
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