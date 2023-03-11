import React from "react";
import {getAllShells} from "./backend";

class Header extends React.Component {

    addServer() {
        getAllShells(document.getElementById("server-url").value);
    }

    render() {
        return (
            <header id="header" className="p-3 bg-primary text-white">
                <div className="container">
                    <div
                        className="d-flex flex-wrap align-items-center justify-content-md-between justify-content-center">
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
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
