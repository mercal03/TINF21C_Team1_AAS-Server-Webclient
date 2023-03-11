import React from "react";
import {getAllShells} from "./backend";
import {index, Main} from "./index";

class Header extends React.Component {

    addServer() {
        index.render(<Main/>);
        let url = document.getElementById("server-url").value;
        window.sessionStorage.setItem("url", url);
        getAllShells(url);
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
                            <form className="mx-2" onSubmit={event => event.preventDefault()}>
                                <input
                                    id="server-url"
                                    type="text"
                                    className="form-control form-control-dark"
                                    placeholder="Type in Server-URL...">
                                </input>
                                <button type="submit" className="btn btn-outline-light mx-2" onClick={this.addServer}>
                                    Add Server
                                </button>
                            </form>
                        </div>
                        <button onClick={this.clear}>{/* Wird wieder entfernt dient nur zum Testen*/}
                            Clear
                        </button>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
