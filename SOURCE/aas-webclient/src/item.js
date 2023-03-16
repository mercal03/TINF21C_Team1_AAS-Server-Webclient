import React from 'react';
import {Button} from "react-bootstrap";
import {buildBody} from "./assetBody";

class Item extends React.Component {

    openAsset = () => {
        let inner = buildBody(this.props.shell);
        inner = inner.flat(Infinity);
        console.log(inner);
        for (let i = 1; i < inner.length; i++) {
            inner[0] += inner[i];
        }
        document.getElementById("assetBodyTable").innerHTML = inner[0];
    }

    render() {
        let name = this.props.shell.idShort;
        let image = this.props.shell.images ? this.props.shell.images[0] : "";
        return (
            <div className={"bg-light rounded p-2 my-2 d-sm-flex justify-content-between align-items-center"}>
                <img style={{maxHeight: "50px"}} src={image} alt={"Icon"}/>
                <div>
                   {name}
                </div>
                <Button variant="primary" className="text-nowrap" onClick={this.openAsset}>
                    Open Asset
                </Button>
            </div>
        );
    }
}

export default Item;