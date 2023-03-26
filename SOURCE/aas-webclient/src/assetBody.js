import React from "react";

class AssetBody extends React.Component {
    render() {
        return (
            <div className="mx-3 py-2 overflow-auto">
                <h3>*Insert Asset Name here*</h3>
                <table className={"table"}>
                    <tbody id={"assetBodyTable"}>
                    </tbody>
                </table>
            </div>
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