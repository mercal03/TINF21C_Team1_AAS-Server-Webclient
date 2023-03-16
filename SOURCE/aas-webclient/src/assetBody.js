import React from "react";

class AssetBody extends React.Component {
    render() {
        return (
            <table>
                <tbody id={"assetBodyTable"}>
                </tbody>
            </table>
        );
    }
}

export function buildBody(json) {
    let value = Object.keys(json).map(key => {
        if (typeof json[key.toString()] === "string" || json[key.toString()] === null) {
            let data = json[key.toString()];
            let value = data ? data : "undefined";
            return "<tr><td>" + key + "</td><td>" + value + "</td></tr>"
        } else if (key === "images") {
            let data = json[key.toString()][0];
            let value = data ? data : "undefined";
            return "<tr><td>" + key + "</td><td>" + value + "</td></tr>"
        } else {
            return buildBody(json[key.toString()]);
        }
    });
    return value;
}

export default AssetBody;