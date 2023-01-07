import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header id="header" className="p-3 bg-primary text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-md-between justify-content-center">
            <h1 className="mx-2">AAS-Webclient</h1>
            <div className="d-flex flex-nowrap align-items-center justify-content-between">
              <form className="mx-2">
                <input
                  id="server-url"
                  type="text"
                  className="form-control form-control-dark"
                  placeholder="Type in Server-URL..."
                ></input>
              </form>
              <button type="button" className="btn btn-outline-light mx-2">
                Add Server
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
