import React from 'react';
import ReactDOM from 'react-dom/client';

const index = ReactDOM.createRoot(document.getElementById('root'));
index.render(<button onClick={request}>Request</button>);

let serverUrl = "http://localhost:51310";
let aasIDs = [];

function request() {
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