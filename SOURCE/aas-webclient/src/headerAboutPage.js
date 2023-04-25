import React from "react";

class HeaderAboutPage extends React.Component {
    render() {
        let serverUrl = window.sessionStorage.getItem("url") ? window.sessionStorage.getItem("url") : "";
        return (
            <header id="header" className="py-2 px-3 bg-primary text-white sticky-top shadow-sm w-100">
                <div className="d-flex flex-wrap align-items-center justify-content-md-between justify-content-center">
                    <div><h1>AAS-Webclient</h1></div>
                    <nav className="d-flex flex-nowrap align-items-center justify-content-between">
                        <a href="/" id="navBtn">Home</a>
                    </nav>
                </div>
            </header>
        );
    }
}

export default HeaderAboutPage;
