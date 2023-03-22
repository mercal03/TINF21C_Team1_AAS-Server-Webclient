import React from "react";
import ServerMenu from "./serverMenu";
import Filter from "./filter"

class Header extends React.Component {
    render() {
        return (
            <header id="header" className="p-3 bg-primary text-white position-fixed w-100">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-md-between justify-content-center">
                        <h1 className="mx-2">AAS-Webclient</h1>
                        <div className="d-flex flex-nowrap align-items-center justify-content-between">
                            <Filter/>
                            <ServerMenu/>
                        </div>
                        
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
