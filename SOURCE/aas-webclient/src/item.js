import React from 'react';
import "./style.css";

class Item extends React.Component {

    openAsset = () => {

    }
    render() {
        let name = this.props.shell.idShort;
        let image = this.props.shell.images ? this.props.shell.images[0] : "";
        return (
            <div onClick={this.openAsset} className={"item bg-light rounded p-2 my-2 d-sm-flex justify-content-between align-items-center"}>
                <img style={{maxHeight: "50px"}} src={image} alt={"Icon"}/>
                <div>
                   {name}
                </div>
            </div>
        );
    }
}

export default Item;