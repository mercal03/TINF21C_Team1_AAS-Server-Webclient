import React from 'react';
import Item from "./item";
import {aasIDs, getShell} from "./backend";

class ItemView extends React.Component {
    render() {
        return (
            <div id={"itemview"}>
                {aasIDs.map(id => {
                    return <Item name={id}/>
                })}
            </div>
        );
    }
}

export default ItemView;