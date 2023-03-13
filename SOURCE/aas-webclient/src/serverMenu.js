import React from "react";
import { getFullShellData } from "./backend";
import { index, Main } from "./index";
import Dropdown from 'react-bootstrap/Dropdown';

class ServerMenu extends React.Component {
  state = {
    serverlist: ["http://localhost:5001"],
  }
  addServer() {
    index.render(<Main />);
    let url = document.getElementById("server-url").value;
    window.sessionStorage.setItem("url", url);
    getFullShellData();
  }

  render() {
    return (
        <Dropdown className="mx-2" autoClose="outside" variant="light">
          <Dropdown.Toggle  id="dropdown-autoclose-outside">
            Server Menü
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <form className="mx-2 d-flex flex-row justify-content-end"
                onSubmit={(event) => event.preventDefault()}>
                <input
                  id="server-url"
                  type="text"
                  className="form-control form-control-dark  w-auto"
                  placeholder="Type in Server-URL...">
                </input>
                <button
                  type="submit"
                  className="btn btn-link mx-2 text-nowrap"
                  onClick={this.addServer}>
                  Add Server
                </button>
              </form>
            </Dropdown.Item>
            {this.state.serverlist.map(serverUrl => {
              let addServer = this.addServer;
              return (
                  <Dropdown.Item onClick={function () {
                    document.getElementById("server-url").value = serverUrl;
                    addServer();
                  }}>
                    {serverUrl}
                  </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      );
  }
}

export default ServerMenu;