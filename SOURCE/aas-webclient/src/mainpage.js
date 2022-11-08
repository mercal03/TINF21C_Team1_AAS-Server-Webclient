import React from "react";

let serverUrl = "http://localhost:51310";
let aasIDs = [];

function request() {
    let request = new XMLHttpRequest();
    request.open("GET", serverUrl + "/server/listaas");
    request.send();

    request.onreadystatechange = () => {
        if (request.status === 200 && request.readyState === 4) {
            let json = JSON.parse(request.responseText);

            for (let i = 0; i < json.aaslist.length; i++) {
                let id = json.aaslist[i];
                let indexes = [];
                for (let x = 0; x < id.length; x++) {
                    if (id[x] === ':') {
                        indexes.push(x);
                    }
                }
                aasIDs.push(id.slice(indexes[0] + 2, indexes[1] - 1));
            }
            console.log(aasIDs);
        }
    }
}


class Mainpage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button onClick={request}>Request</button>
                <p id="responseText"></p>
            </div>
        );
    }
}

export default Mainpage;