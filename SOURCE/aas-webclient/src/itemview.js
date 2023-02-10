import React from 'react';
import Item from "./item";
import {shells, getAllShells} from "./backend";

class ItemView extends React.Component {
    componentDidMount() {
        getAllShells();
    }

    render() {
        console.log("Reduzierte Infos");
        console.log(shells);
        return (
            <div className="p-2 flex-fill">
            <h3>Assets</h3>
            <div id={"itemview"}>
                {shells.map(id => {
                    return <Item name={id[0]}/>
                })}
            </div>
            </div> 
        );
    }
}

export default ItemView;