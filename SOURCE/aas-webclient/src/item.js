import React from 'react';
import { Modal, Button } from "react-bootstrap";
import {getShell} from "./backend";

class Item extends React.Component {
    render() {
        let name = this.props.name;
        return (
            <div id={name}  className={"border p-2 my-2 d-flex justify-content-between align-items-center"}>
                <div>
                   {name} 
                </div>
                <button onClick={getShell} className={"btn btn-primary"}>
                    Open Asset
                </button>
            </div>
        );
    }
}

export default Item;