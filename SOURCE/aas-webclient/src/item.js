import React from 'react';
import "./style.css";
import {index, Main} from "./index";

class Item extends React.Component {

    openAsset = () => {
        window.sessionStorage.setItem("shellBody", JSON.stringify(this.props.shell));
        index.render(<Main/>);
    }
    render() {
        let name = this.props.shell.idShort;
        let image = this.props.shell.image ? this.props.shell.image : "";
        return (
            <div onClick={this.openAsset} className={"item bg-light rounded p-2 my-2 d-sm-flex justify-content-between align-items-center"}>
                <img style={{maxHeight: "50px"}} src={image} alt={""}/>
                <div>
                   {name}
                </div>
            </div>
        );
    }
}

export default Item;