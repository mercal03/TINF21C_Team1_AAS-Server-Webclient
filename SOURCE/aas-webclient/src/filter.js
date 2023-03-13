import React from "react";
import { index, Main } from "./index";
import Dropdown from "react-bootstrap/Dropdown";

class Filter extends React.Component {
  filterForName() {
    //Sucht nach einem AAS name
    let searchInput = document
      .getElementById("searchField")
      .value.toLowerCase(); // zieht sich den Namen aus dem Inputfeld über die ID
    let newAssetArray = [];
    let shells = JSON.parse(window.sessionStorage.getItem("shells"));

    shells.forEach((element) => {
      if (element["idShort"].toLowerCase().search(searchInput) !== -1) {
        // Abfrage ob Suchstring enthalten ist
        newAssetArray.push(element);
      }
    });
    if (newAssetArray.length === 0) {
      //Error Handling
      alert("No results found");
    } else {
      window.sessionStorage.setItem("content", JSON.stringify(newAssetArray));
      index.render(<Main />);
    }
  }

  filterOptions() {
    //tbd
  }

  render() {
    return (
      <div className="p-2 d-flex flex-row">
         <Dropdown className="mx-2" autoClose="outside" variant="light"  align="end">
          <Dropdown.Toggle id="dropdown-autoclose-outside">
           Jahr
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <form
                className="mx-2 d-flex flex-row"
                onSubmit={(event) => event.preventDefault()}
              >
                <input
                  id="blafwsefbla"
                  type="text"
                  className="form-control form-control-dark  w-auto"
                  placeholder="Jahr..."
                ></input>
                <button
                  type="submit"
                  className="btn btn-link mx-2 text-nowrap"
                  onClick={this.addServer}
                >
                  Search
                </button>
              </form>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3">Jahr blablab</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown >
         <Dropdown className="mx-2" autoClose="outside" variant="light"  align="end">
          <Dropdown.Toggle id="dropdown-autoclose-outside">
           Hersteller
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <form
                className="mx-2 d-flex flex-row"
                onSubmit={(event) => event.preventDefault()}
              >
                <input
                  id="blabla"
                  type="text"
                  className="form-control form-control-dark  w-auto"
                  placeholder="Hersteller..."
                ></input>
                <button
                  type="submit"
                  className="btn btn-link mx-2 text-nowrap"
                  onClick={this.addServer}
                >
                  Search
                </button>
              </form>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3">Hersteller 1 blablab</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* Suchfeldleiste */}
        <form
          className="form-inline d-md-flex mx-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            id={"searchField"}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-primary my-2 my-sm-0"
            type="submit"
            onClick={this.filterForName}
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Filter;
