import React from "react";
import {index, Main} from "./index";
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
        }
        else {
            window.sessionStorage.setItem("content", JSON.stringify(newAssetArray));
            index.render(<Main/>);
        }
    }

    getManufactureName() {
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        shells.forEach((element) => {
            if (element["nameplate"]) {
                if (element["nameplate"]["ManufacturerName"])
                    newAssetArray.push(element["nameplate"]["ManufacturerName"]);
            }
        });
        newAssetArray = [...new Set(newAssetArray)]
        newAssetArray.unshift("Alle")
        var option = "";
        for (var i = 0; i < newAssetArray.length; i++) {
            option += '<option value="' + newAssetArray[i] + '">' + newAssetArray[i] + "</option>";
        }
        document.getElementById("manufacturerNameDropDown").innerHTML = option;
    }

    filterForManufacturerName() {
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        let manufacturerNameDropDown = document.getElementById("manufacturerNameDropDown").value;
        if (manufacturerNameDropDown) {
            if (manufacturerNameDropDown === "Alle") {
                newAssetArray = shells;
            } else {
                shells.forEach((element) => {
                    if (element["nameplate"]) {
                        if (element["nameplate"]["ManufacturerName"].search(manufacturerNameDropDown) !== -1) {
                            newAssetArray.push(element)
                        }
                    }
                })
            }
        }
        if (newAssetArray.length === 0) {
            //Error Handling
            alert("No results found");
        } else {
            window.sessionStorage.setItem("content", JSON.stringify(newAssetArray));
            index.render(<Main/>);
        }
    }

    searchForManufacturerName() {
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        let manufacturerNameSearchField = document.getElementById("manufacturerNameSearchField").value.toLowerCase();

        if (manufacturerNameSearchField) {
            shells.forEach((element) => {
                if (element["nameplate"]) { // Macht für mich keinen Sinn: MARCEEEEEELLLLLLL? WIESOOOOOOOOOO?
                    if (element["nameplate"]["ManufacturerName"].toLowerCase().search(manufacturerNameSearchField) !== -1) {
                        newAssetArray.push(element)
                    }
                }
            })
        }
        if (newAssetArray.length === 0) {
            //Error Handling
            alert("No results found");
        } else {
            window.sessionStorage.setItem("content", JSON.stringify(newAssetArray));
            index.render(<Main/>);
        }
        document.getElementById("manufacturerNameSearchField").value = '';
    }

    sortAsYear() {
        let upOrDown = document.getElementById("sortByYear").value;
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));


        shells.forEach((element) => {
            if(element["nameplate"]) {
                if (element["nameplate"]["YearOfConstruction"]) {
                    newAssetArray.push(element["nameplate"]["YearOfConstruction"]);
                }
            }
        })
        console.table(newAssetArray)

        /*if (newAssetArray.length === 0) {
            //Error Handling
            alert("No results found");
        } else {
            window.sessionStorage.setItem("content", JSON.stringify(newAssetArray));
            index.render(<Main/>);
        }*/
    }

    deleteSearchInput(){
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        document.getElementById("searchField").value = ""
        if (shells.length === 0) {
            //Error Handling
            alert("Cannot Clear!");
        }
        else {
            window.sessionStorage.setItem("content", JSON.stringify(shells));
            index.render(<Main/>);
        }
}

/*    sortByDateDescanding(a, b)
{
    return  b[][] - a[][]
} */   //Welches objekt ist am neuesten. Nach Alter sortieren.
    //Hersteller filtern
    //Jahr

    render() {
        return (
            <div className="p-2 d-flex flex-row">
                <Dropdown className="mx-2" autoClose="outside" variant="light" align="end">
                    <Dropdown.Toggle id="dropdown-autoclose-outside">
                        Jahr
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <select id={"sortByYear"} className="form-select" onChange={this.sortAsYear}>
                            <option value="up">aufsteigend</option>
                            <option value="down">absteigend</option>
                        </select>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mx-2" autoClose="outside" variant="light" align="end"
                          onClick={this.getManufactureName}>
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
                                    id="manufacturerNameSearchField"
                                    type="text"
                                    className="form-control form-control-dark  w-auto"
                                    placeholder="Hersteller"
                                ></input>
                                <button
                                    type="submit"
                                    className="btn btn-link mx-2 text-nowrap"
                                    onClick={this.searchForManufacturerName}
                                >
                                    Search
                                </button>
                            </form>
                        </Dropdown.Item>
                        <div className={"form-group"}>
                            <select className={"form-control"} id={"manufacturerNameDropDown"}
                                    onChange={this.filterForManufacturerName}>
                            </select>
                        </div>
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
                    <input type="reset" value="X" alt="Clear the search form" onClick={this.deleteSearchInput}/>
                    <button
                        id={"searchInputStringBtn"}
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
