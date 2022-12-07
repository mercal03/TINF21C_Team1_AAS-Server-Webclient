import React from 'react';
import ReactDOM from 'react-dom/client';
import Filter from "./filter";
import ItemView from "./itemview";
import {firstRender, requestIDs} from "./backend";
import "./style.css";

class Main extends React.Component {
    render() {
        return (
            <div>
                <div id={"header"}>
                    <h1>AAS-Webclient</h1>
                    <div id="serverinfo">
                        <p>Server: "address to server"</p>
                        <button>Add/Delete Server</button>
                    </div>
                </div>
                <Filter/>
                <ItemView/>
            </div>
        );
    }
}

const index = ReactDOM.createRoot(document.getElementById('root'));
requestIDs();
let interval = setInterval(function () {
    if (firstRender) {
        index.render(<Main/>);
        clearInterval(interval);
    }
}, 100);