import React from 'react';
import Item from "./item";

class ItemView extends React.Component {
    render() {
        if (window.sessionStorage.getItem("url") === null) {
            return <div></div>;
        } else {
            let allShells = JSON.parse(window.sessionStorage.getItem("shells"));
            let shells = JSON.parse(window.sessionStorage.getItem("content"));
            if (shells !== null && shells !== undefined) {
                return (
                    <div className="m-2 p-2 col-4 overflow-auto list-group">
                        <h3>Select Asset</h3>
                        <div id={"submodel-buttons"}>
                            {allShells.map(shell => {
                                for (let i = 0; i < shells.length; i++) {
                                    if (shells[i].id === shell.id) {
                                        return <Item key={shell.idShort} shell={shell}/>
                                    }
                                }
                            })}
                        </div>
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