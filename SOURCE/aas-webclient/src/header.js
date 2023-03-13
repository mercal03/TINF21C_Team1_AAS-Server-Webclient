import React from "react";
import {getFullShellData} from "./backend";
import {index, Main} from "./index";
import ServerMenu from "./serverMenu";
import Filter from "./filter"

class Header extends React.Component {

    addServer() {
        index.render(<Main/>);
        let url = document.getElementById("server-url").value;
        window.sessionStorage.setItem("url", url);
        getFullShellData();
    }

    clear() {
        window.sessionStorage.clear();
        index.render(<Main/>);
    }

    render() {
        return (
            <header id="header" className="p-3 bg-primary text-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-md-between justify-content-center">
                        <h1 className="mx-2">AAS-Webclient</h1>
                        <div className="d-flex flex-nowrap align-items-center justify-content-between">
                            <Filter/>
                            <button onClick={this.clear}>{/* Wird wieder entfernt dient nur zum Testen*/}
                                Clear
                            </button>
                            <ServerMenu/>
                        </div>
                        
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
