import React from "react";
import ServerMenu from "./serverMenu";
import Filter from "./filter"

class Header extends React.Component {
    render() {
        return (
            <header id="header" className="p-2 bg-primary text-white sticky-top shadow-sm w-100">
                    <div className="d-flex flex-wrap align-items-center justify-content-md-between justify-content-center">
                        <div><h1>AAS-Webclient<span className="version">v.1.3</span></h1></div>
                        
                        <div className="d-flex flex-nowrap align-items-center justify-content-between">
                            <Filter/>
                            <ServerMenu/>
                        </div>
                        
                    </div>
            </header>
        );
    }
}

export default Header;
