import React from 'react';
import Item from "./item";
import {aasIDs, getAllShells} from "./backend";

class ItemView extends React.Component {
    componentDidMount() {
        getAllShells();
    }

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