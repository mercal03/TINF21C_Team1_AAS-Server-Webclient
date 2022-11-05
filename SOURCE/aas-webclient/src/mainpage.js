import React from "react";

let serverUrl = "http://localhost:51310";

function request() {
    let request = new XMLHttpRequest();
    request.open("GET", serverUrl + "/server/listaas");
    request.send();

    request.onreadystatechange = () => {
        if (request.status === 200 && request.readyState === 4) {
            let json = JSON.parse(request.responseText);
            console.log(json.aaslist[0]);
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