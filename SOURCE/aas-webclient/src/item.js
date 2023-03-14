import React from 'react';
import OpenModal from "./openModal"

class Item extends React.Component {
    

    render() {
        let name = this.props.name;
        let image = this.props.image ? this.props.image[0] : "";
        return (
            <div className={"bg-light rounded p-2 my-2 d-sm-flex justify-content-between align-items-center"}>
                <img style={{maxHeight: "50px"}} src={image} alt={"Icon"}/>
                <div>
                   {name} 
                </div>
                <OpenModal name = {name} index={this.props.index}/>
            </div>
        );
    }
}

export default Item;