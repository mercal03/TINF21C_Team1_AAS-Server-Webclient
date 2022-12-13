import React from 'react';
import {getShell} from "./backend";

class Item extends React.Component {
    render() {
        let name = this.props.name;
        return (
            <div className={"item"}>
                <p onClick={getShell}>{name}</p>
            </div>
        );
    }
}

export default Item;