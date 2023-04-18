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

    getManufactureName() {
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        shells.forEach((element) => {
            if (element["nameplate"]) {
                if (element["nameplate"]["ManufacturerName"])
                    newAssetArray.push(element["nameplate"]["ManufacturerName"]);
            }
        });
        newAssetArray = [...new Set(newAssetArray)];
        newAssetArray.unshift("Alle");
        var option = "";
        for (var i = 0; i < newAssetArray.length; i++) {
            option +=
                '<option value="' +
                newAssetArray[i] +
                '">' +
                newAssetArray[i] +
                "</option>";
        }
        document.getElementById("manufacturerNameDropDown").innerHTML = option;
    }

    filterForManufacturerName() {
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        let manufacturerNameDropDown = document.getElementById(
            "manufacturerNameDropDown"
        ).value;
        if (manufacturerNameDropDown) {
            if (manufacturerNameDropDown === "Alle") {
                newAssetArray = shells;
            } else {
                shells.forEach((element) => {
                    if (element["nameplate"]) {
                        if (
                            element["nameplate"]["ManufacturerName"].search(
                                manufacturerNameDropDown
                            ) !== -1
                        ) {
                            newAssetArray.push(element);
                        }
                    }
                });
            }
        }
        if (newAssetArray.length === 0) {
            //Error Handling
            alert("No results found");
        } else {
            window.sessionStorage.setItem("content", JSON.stringify(newAssetArray));
            index.render(<Main />);
        }
    }

    searchForManufacturerName() {
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        let manufacturerNameSearchField = document
            .getElementById("manufacturerNameSearchField")
            .value.toLowerCase();

        if (manufacturerNameSearchField) {
            shells.forEach((element) => {
                if (element["nameplate"]) {
                    if (
                        element["nameplate"]["ManufacturerName"]
                            .toLowerCase()
                            .search(manufacturerNameSearchField) !== -1
                    ) {
                        newAssetArray.push(element);
                    }
                }
            });
        }
        if (newAssetArray.length === 0) {
            //Error Handling
            alert("No results found");
        } else {
            window.sessionStorage.setItem("content", JSON.stringify(newAssetArray));
            index.render(<Main />);
        }
        document.getElementById("manufacturerNameSearchField").value = "";
    }


    deleteSearchInput() {
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        document.getElementById("searchField").value = "";
        if (shells.length === 0) {
            //Error Handling
            alert("Cannot Clear!");
        } else {
            window.sessionStorage.setItem("content", JSON.stringify(shells));
            index.render(<Main />);
        }
    }

    sortAsYear() {
        let upOrDown = document.getElementById("sortByYear").value;
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        let newAssetDateArray = [];
        console.log(newAssetDateArray)

        shells.forEach((element) => {
            if (element["Nameplate"]) {
                if (element["Nameplate"]["YearOfConstruction"]) {
                    if (element["Nameplate"]["YearOfConstruction"].length === 4) {
                        // Jahr formatieren
                        element["Nameplate"]["YearOfConstruction"] = element["Nameplate"]["YearOfConstruction"] + "-01-01";
                    } else if (element["Nameplate"]["YearOfConstruction"].length === 7) {
                        // Jahr und Monat formatieren
                        element["Nameplate"]["YearOfConstruction"] = element["Nameplate"]["YearOfConstruction"] + "-01";
                    } else {
                        // Datum ist bereits im richtigen Format
                        element["Nameplate"]["YearOfConstruction"] = element["Nameplate"]["YearOfConstruction"];
                    }
                    newAssetDateArray.push(element);
                }
            }
        });


        let sortedDates = []
                console.log("Sortiert:")
                sortedDates = newAssetDateArray.sort((a, b) => {
                    const dateA = new Date(a.Nameplate.YearOfConstruction);
                    const dateB = new Date(b.Nameplate.YearOfConstruction);
                    return dateA - dateB;
                });

        if (sortedDates.length === 0) {
            //Error Handling
            alert("Cannot Clear!");
        } else {
            window.sessionStorage.setItem("content", JSON.stringify(sortedDates));
            index.render(<Main />);
        }
    }


    render() {
        return (
            <div className="px-3 py-1 d-flex flex-row shadow-sm bg-light align-items-center justify-content-start">
                <Dropdown
                    className="my-dropdown"
                    autoClose="outside"
                    variant="light"
                    align="end"
                >
                    <Dropdown.Toggle id="dropdown-autoclose-outside">
                        Jahr
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <select
                            id={"sortByYear"}
                            className="form-select"
                            onChange={this.sortAsYear}
                        >
                            <option value="up">aufsteigend</option>
                            <option value="down">absteigend</option>
                        </select>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown
                    className="mx-2 my-dropdown"
                    autoClose="outside"
                    variant="light"
                    align="end"
                    onClick={this.getManufactureName}
                >
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
                            <select
                                className={"form-control"}
                                id={"manufacturerNameDropDown"}
                                onChange={this.filterForManufacturerName}
                            ></select>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
                {/* Suchfeldleiste */}
                <form onSubmit={(event) => event.preventDefault()}>
                    <div className="search-bar-container d-flex flex-row bg-white align-items-center input-group">
                        <input
                            id={"searchField"}
                            className="mr-sm-2 border-0 px-3 py-1 bg-transparent outline-none"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <div className="input-group-append d-flex flex-row align-items-center">
                            <button
                                id={"searchInputStringBtn"}
                                className="my-2 my-sm-0 d-flex my-search-button"
                                type="submit"
                                onClick={this.filterForName}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-search"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                            <input
                                className="my-search-button px-3"
                                type="reset"
                                value="X"
                                alt="Clear the search form"
                                onClick={this.deleteSearchInput}
                            />
                        </div>


                    </div>
                </form>
            </div>
        );
    }
}

export default Filter;