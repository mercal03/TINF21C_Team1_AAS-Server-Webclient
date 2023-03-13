import React from "react";
import { getFullShellData } from "./backend";
import { index, Main } from "./index";
import Dropdown from 'react-bootstrap/Dropdown';

class ServerMenu extends React.Component {
  addServer() {
    index.render(<Main />);
    let url = document.getElementById("server-url").value;
    window.sessionStorage.setItem("url", url);
    getFullShellData();
  }

  clear() {
    window.sessionStorage.clear();
    index.render(<Main />);
  }

  render() {
    return (
        <Dropdown className="mx-2" autoClose="outside" variant="light">
          <Dropdown.Toggle  id="dropdown-autoclose-outside">
            Server Menü
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item><form
                className="mx-2 d-flex flex-row justify-content-end"
                onSubmit={(event) => event.preventDefault()}
              >
                <input
                  id="server-url"
                  type="text"
                  className="form-control form-control-dark  w-auto"
                  placeholder="Type in Server-URL..."
                ></input>
                <button
                  type="submit"
                  className="btn btn-link mx-2 text-nowrap"
                  onClick={this.addServer}
                >
                  Add Server
                </button>
              </form></Dropdown.Item>
            <Dropdown.Item href="#/action-3">Example Server</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
  }
}

export default ServerMenu;

<div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown button
        </button>
        <div class="dropdown-menu">
              
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">
                Example Server A
              </a>
              <a class="dropdown-item" href="#">
                Example Server B
              </a>
            </div>
      </div>