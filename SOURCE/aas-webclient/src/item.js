import React from 'react';
import OpenModal from "./openModal"

class Item extends React.Component {
    

    render() {
        let name = this.props.name;
        return (
            <div id={name}  className={"bg-light rounded p-2 my-2 d-sm-flex justify-content-between align-items-center"}>
                <div>
                   {name} 
                </div>
                <OpenModal name = {name} index={this.props.index}/>
            </div>
        );
    }
}

export default Item;