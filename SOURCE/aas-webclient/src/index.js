import React from 'react';
import ReactDOM from 'react-dom/client';
import Filter from "./filter";
import ItemView from "./itemview";
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

export const index = ReactDOM.createRoot(document.getElementById('root'));
index.render(<Main/>);

export function reload() {
    index.render(<Main/>);
}