import React from "react";

class AssetBody extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Body update");
    }

    changeContent = (event) => {
        let children = document.getElementById("bodyContent").children;
        for (let child of children) {
            child.hidden = true;
        }
        document.getElementById(event.target.innerHTML.toString().toLowerCase()).hidden = false;
    }

    render() {
        let shell = JSON.parse(window.sessionStorage.getItem("shellBody"));
        if (window.sessionStorage.getItem("shellBody") !== null) {
            return (
                <div className="mx-3 py-2 overflow-auto w-100">
                    <h2>{shell.idShort}</h2>
                    <div className={"d-flex flex-column"}>
                        <div className={"d-inline-flex"}>
                            <img src={shell.image} alt={""}/>
                            <div>Id: {shell.id}</div>
                        </div>
                        <div className={"d-inline-flex"}>
                            <div className={"d-flex flex-column"}>
                                {Object.entries(shell).map(([key, value]) => {
                                    if (typeof value === "object" && shell[key] !== null) {
                                        return (
                                            <button onClick={this.changeContent}>{key[0].toUpperCase()}{key.substring(1, key.length)}</button>
                                        );
                                    }
                                })}
                            </div>
                            <div id={"bodyContent"}>
                                {buildBody(shell)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

const buildBody = (shell) => {
    return Object.entries(shell).map(([key, value]) => {
        if (typeof value === "object") {
            return (
                <table id={key} hidden={true}>
                    <tbody>
                    {shell[key] ? Object.entries(shell[key]).map(([key, value]) => {
                        if (typeof value !== "object") {
                            return (
                                <tr>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            );
                        } else {
                            return (
                                <tr>
                                    <td>{key}</td>
                                    <td>Muss noch gemacht werden!!!</td>
                                </tr>
                            );
                        }
                    }) : <tr></tr>}
                    </tbody>
                </table>
            );
        }
    })
}

export default AssetBody;