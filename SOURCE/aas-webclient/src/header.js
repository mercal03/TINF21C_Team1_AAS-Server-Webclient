import React from "react";
import ServerMenu from "./serverMenu";

class Header extends React.Component {
    render() {
        let serverUrl = window.sessionStorage.getItem("url") ? window.sessionStorage.getItem("url") : "";
        return (
            <header id="header" className="py-2 px-3 bg-primary text-white sticky-top shadow-sm w-100">
                    <div className="d-flex flex-wrap align-items-center justify-content-md-between justify-content-center">
                        <div><h1>AAS-Webclient</h1></div>
                            <nav className="d-flex flex-nowrap align-items-center justify-content-between">
                                <span>Current Server: <a href={serverUrl} target={"_blank"}>{serverUrl}</a></span>
                                <ServerMenu/>
                                {/*<a href="/about" class="navBtn">About</a>*/}
                            </nav>
                    </div>
            </header>
        );
    }
}

export default Header;
