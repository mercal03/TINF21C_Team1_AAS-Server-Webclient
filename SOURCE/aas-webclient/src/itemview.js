import React from 'react';
import Item from "./item";

class ItemView extends React.Component {
    render() {
        let shells = JSON.parse(window.sessionStorage.getItem("content"));
        let content = <div/>;
        if (shells !== null) {
            content =
                <div>
                    {shells.map(id => {
                        return <Item name={id["idShort"]}/>
                    })}
                </div>
        }
        return (
            <div className="p-2 flex-fill">
                <h3>Assets</h3>
                {content}
            </div>
        );
    }
}

export default ItemView;