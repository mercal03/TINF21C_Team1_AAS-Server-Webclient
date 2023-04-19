import React from "react";
import ServerMenu from "./serverMenu";

class Header extends React.Component {
    render() {
        return (
            <header id="header" className="py-2 px-3 bg-primary text-white sticky-top shadow-sm w-100">
                    <div className="d-flex flex-wrap align-items-center justify-content-md-between justify-content-center">
                        <div><h1>AAS-Webclient</h1></div>
                        
                        <div className="d-flex flex-nowrap align-items-center justify-content-between">
                            <ServerMenu/>
                        </div>
                        
                    </div>
            </header>
        );
    }
}

export default Header;
