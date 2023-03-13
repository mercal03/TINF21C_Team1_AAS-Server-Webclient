import React from 'react';
import Item from "./item";

class ItemView extends React.Component {
    render() {
        if (window.sessionStorage.getItem("url") === null) {
            return <div></div>;
        } else {
            let shells = JSON.parse(window.sessionStorage.getItem("content"));
            if (shells !== null) {
                return (
                    <div className="p-2 col-4 bg-primary-subtle">
                        <h3>Assets</h3>
                        {shells.map((id, i) => {
                            return <Item key={id["idShort"]} index={i} name={id["idShort"]}/>
                        })}
                    </div>
                );
            } else {
                return (
                    <div className="position-absolute top-50 start-50 translate-middle">
                        <div className="spinner-border" role="status">
                            <span className="sr-only"/>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default ItemView;