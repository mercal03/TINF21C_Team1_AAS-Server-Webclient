import React from "react";
import {getFullShellData} from "./backend";
import {index, Main} from "./index";
import Dropdown from 'react-bootstrap/Dropdown';

class ServerMenu extends React.Component {
    state = {
        serverlist: ["https://v3.admin-shell-io.com/", "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org"],
    }

    componentDidMount() {
        if (window.sessionStorage.getItem("url") === null) {
            window.sessionStorage.setItem("url", "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org");
            getFullShellData();
        }
    }

    changeServer() {
        let mode = document.getElementById("addServerbtn").innerHTML;
        window.sessionStorage.clear();
        let prevUrl = window.sessionStorage.getItem("url");
        if (mode === "Add Server" || prevUrl !== document.getElementById("server-url").value) {
            document.getElementById("addServerbtn").innerHTML = "Delete Server";
            index.render(<Main/>);
            let url = document.getElementById("server-url").value;
            window.sessionStorage.setItem("url", url);
            getFullShellData();
        } else {
            document.getElementById("addServerbtn").innerHTML = "Add Server";
            document.getElementById("server-url").value = "";
            index.render(<Main/>);
        }
    }

    render() {
        return (
            <Dropdown className="mx-2" autoClose="outside" variant="light">
                <Dropdown.Toggle id="dropdown-autoclose-outside">
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
                                id={"addServerbtn"}
                                type="submit"
                                className="btn btn-link mx-2 text-nowrap"
                                onClick={this.changeServer}>
                                Add Server
                            </button>
                        </form>
                    </Dropdown.Item>
                    {this.state.serverlist.map(serverUrl => {
                        let changeServer = this.changeServer;
                        return (
                            <Dropdown.Item onClick={function () {
                                document.getElementById("server-url").value = serverUrl;
                                changeServer();
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