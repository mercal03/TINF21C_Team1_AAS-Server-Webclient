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
                            <div>
                                <table>
                                    <tbody>
                                    {Object.entries(shell).map(([key, value]) => {
                                        if (typeof value !== "object") {
                                            return (
                                                <tr>
                                                    <td>{key}</td>
                                                    <td>{value}</td>
                                                </tr>
                                            );
                                        }
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={"d-inline-flex"}>
                            <div className={"d-flex flex-column"}>
                                {Object.entries(shell).map(([key, value]) => {
                                    if (typeof value === "object" && shell[key] !== null) {
                                        return (
                                            <button
                                                onClick={this.changeContent}>{key[0].toUpperCase()}{key.substring(1, key.length)}</button>
                                        );
                                    }
                                })}
                            </div>
                            <div id={"bodyContent"}>
                                {Object.entries(shell).map(([key, value]) => {
                                    if (typeof value === "object") {
                                        return buildBody(shell[key], key);
                                    }
                                })}
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

const buildBody = (json, id="") => {
    return (
        <table id={id}>
            <tbody>
            {json ? Object.entries(json).map(([key, value]) => {
                if (typeof value === "object") {
                    if (Object.keys(json[key]).length > 0) {
                        return (
                            <tr>
                                <td colSpan={2}>
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button collapsed"
                                                        type="button" data-bs-toggle="collapse"
                                                        data-bs-target={`#${key}`}
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne">
                                                    {key}
                                                </button>
                                            </h2>
                                            <div id={`${key}`}
                                                 className="accordion-collapse collapse"
                                                 aria-labelledby="headingOne">
                                                <div className="accordion-body">
                                                    {buildBody(json[key])}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    }
                } else {
                    return (
                        <tr>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    );
                }
            }) : <tr></tr>}
            </tbody>
        </table>
    );
}

export default AssetBody;