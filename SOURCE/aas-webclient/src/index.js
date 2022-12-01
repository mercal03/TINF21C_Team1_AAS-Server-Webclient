import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import Filter from "./filter";
import ItemView from "./itemview";
import {request, aasIDs, firstRender} from "./backend";

class Main extends React.Component {
    render() {
        return (
            <div>
                {aasIDs.map(id => {
                    return <p>{id}</p>
                })}
            </div>
        );
    }
}

const index = ReactDOM.createRoot(document.getElementById('root'));
request();
let interval = setInterval(function () {
    if (firstRender) {
        index.render(<Main/>);
        clearInterval(interval);
    }
}, 100);