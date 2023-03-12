import React from "react";

class ModalBody extends React.Component {
    render() {
        let content = this.props.content;

        return (
            <table>
                <tbody>
                {buildBody(content)}
                </tbody>
            </table>
        );
    }
}

function buildBody(json) {
    let returnData = Object.keys(json).map(key => {
        if (typeof json[key.toString()] === "string" || json[key.toString()] === null) {
            let data = json[key.toString()];
            return (
                <tr>
                    <td>{key}</td>
                    <td>{data ? data : "undefined"}</td>
                </tr>
            );
        } else if (key === "images") {
            let data = json[key.toString()][0];
            return (
                <tr>
                    <td>{key}</td>
                    <td>{data ? data : "undefined"}</td>
                </tr>
            );
        } else {
            return buildBody(json[key.toString()]);
        }
    });
    console.log(json);
    console.log(returnData);
    return returnData;
}

export default ModalBody;