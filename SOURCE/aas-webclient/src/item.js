import React from 'react';
import "./style.css";
import {index, Main} from "./index";
import {loadBody} from "./backend";

class Item extends React.Component {

    openAsset = (e) => {
        
        document.getElementById("")
        let parent = document.getElementById(this.props.shell.idShort).parentElement;
        let children = Array.from(parent.children);
        children.map(function (item){
        item.classList.remove("bg-primary-subtle");
        })
        document.getElementById(this.props.shell.idShort).classList.add("bg-primary-subtle");
        if (Object.keys(this.props.shell).includes("submodels")) {
            loadBody(this.props.shell).then(response => {
                window.sessionStorage.setItem("shellBody", JSON.stringify(response));
                index.render(<Main/>);
            });
        } else {
            window.sessionStorage.setItem("shellBody", JSON.stringify(this.props.shell));
            index.render(<Main/>);
        }
        document.getElementById("error_message_NextToSearchField").style.visibility = "hidden";
        //reset submodel buttons
        let buttons = document.getElementsByClassName("navigation-button");
        for(let button of buttons){
            button.classList.remove("bg-primary-subtle");
        }
        buttons[0].classList.add("bg-primary-subtle");
    }
    render() {
        let name = this.props.shell.idShort;
        let image = this.props.shell.image ? this.props.shell.image : "";
        return (
            <div id={name} onClick={this.openAsset} className={"item p-2 my-2 d-sm-flex justify-content-between align-items-center list-group-item-action list-group-item border shadow-sm rounded"}>
                <img style={{maxHeight: "50px"}} src={image} alt={""}/>
                <div>
                   {name}
                </div>
            </div>
        );
    }
}

export default Item;