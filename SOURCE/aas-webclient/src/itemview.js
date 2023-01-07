import React from 'react';
import Item from "./item";
import {aasIDs, getAllShells} from "./backend";

class ItemView extends React.Component {
    componentDidMount() {
        getAllShells();
    }

    render() {
        return (
            <div className="p-2 flex-fill">
            <h3>Assets</h3>
            <p>No contents available, connect Server to display Assets</p>
            </div>
            /* <div id={"itemview"}>
                {aasIDs.map(id => {
                    return <Item name={id}/>
                })}
            </div> */
        );
    }
}

export default ItemView;