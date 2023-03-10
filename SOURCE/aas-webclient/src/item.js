import React from 'react';
import OpenModal from "./openModal"

class Item extends React.Component {
    

    render() {
        console.log("Item");
        let name = this.props.name;
        return (
            <div id={name}  className={"border p-2 my-2 d-sm-flex justify-content-between align-items-center"}>
                <div>
                   {name} 
                </div>
                <OpenModal name = {name}/>
            </div>
        );
    }
}

export default Item;