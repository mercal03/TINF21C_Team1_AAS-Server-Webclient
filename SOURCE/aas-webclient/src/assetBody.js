import React from "react";

class AssetBody extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Body update");
    }

    render() {
        return (
            <div className="mx-3 py-2 overflow-auto">
                <h2>ASSET NAME</h2>
                <div className={"d-flex flex-column"}>
                    <div className={"d-inline-flex"}>
                        <img src={""} alt={"PAIN"}/>
                        <div>wichtige news</div>
                    </div>
                    <div className={"d-inline-flex"}>
                        <p>1</p>
                        <p>2</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default AssetBody;