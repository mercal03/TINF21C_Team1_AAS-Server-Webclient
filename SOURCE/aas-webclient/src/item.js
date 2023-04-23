import React from 'react';
import "./style.css";
import {index, Main} from "./index";
import {loadBody} from "./backend";

class Item extends React.Component {

    openAsset = () => {
        if (Object.keys(this.props.shell).includes("submodels")) {
            loadBody(this.props.shell).then(response => {
                window.sessionStorage.setItem("shellBody", JSON.stringify(response));
                index.render(<Main/>);
            });
        } else {
            window.sessionStorage.setItem("shellBody", JSON.stringify(this.props.shell));
            index.render(<Main/>);
        }
    }
    render() {
        let name = this.props.shell.idShort;
        let image = this.props.shell.image ? this.props.shell.image : "";
        return (
            <div onClick={this.openAsset} className={"item p-2 my-2 d-sm-flex justify-content-between align-items-center list-group-item-action list-group-item border shadow-sm rounded"}>
                <img style={{maxHeight: "50px"}} src={image} alt={""}/>
                <div>
                   {name}
                </div>
            </div>
        );
    }
}

export default Item;