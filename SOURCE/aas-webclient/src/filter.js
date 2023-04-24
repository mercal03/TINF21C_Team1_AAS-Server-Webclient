import React from "react";
import {index, Main} from "./index";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "react-bootstrap/DropdownItem";

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
            index.render(<Main/>);
        }
    }

    autoComplete() {
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        let options = [];
        shells.forEach((element) => {
            if (element["idShort"]) {
                console.log(element["idShort"])
                options.push(element["idShort"])
            }
        })

        const input = document.getElementById("searchField").value.toLowerCase();
        const autoCompleteList = document.getElementById('autoCompleteList');
        const searchField = document.getElementById('searchField');

        autoCompleteList.innerHTML = '';

        const filteredOptions = options.filter(option => option.toLowerCase().startsWith(input));
        filteredOptions.forEach(option => {
            const li = document.createElement('li' );
            li.textContent = option;
            li.setAttribute('id', option);
            li.classList.add('autoCompleteItem');
            li.addEventListener('click',()  => {
                    document.getElementById("autoCompleteList").style.display='none';
                    let shells = JSON.parse(window.sessionStorage.getItem("shells"));
                    let newAsset = [];
                    shells.forEach((element) => {
                        if(element["idShort"] && element["idShort"] === option){
                            newAsset.push(element)
                        }
                    })
                if (newAsset.length === 0) {
                    //Error Handling
                    alert("No results found");
                } else {
                    window.sessionStorage.setItem("content", JSON.stringify(newAsset));
                    index.render(<Main/>);
                }
                }
            )
            autoCompleteList.appendChild(li);
        });
        autoCompleteList.style.display='block';
    }

    getAssetNames() {
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        let AssetNames = [];
        shells.forEach((element) => {
            if (element["idShort"]) {
                console.log(element["idShort"])
                AssetNames.push(element["idShort"])
            }
        })
        alert("HALLO")
        return AssetNames
    }

    getManufactureName() {
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));

        if (shells !== null) {
            shells.forEach((element) => {
                if (element["Nameplate"]) {
                    if (element["Nameplate"]["ManufacturerName"])
                        newAssetArray.push(element["Nameplate"]["ManufacturerName"]);
                }
            });
            newAssetArray = [...new Set(newAssetArray)];
            newAssetArray.unshift("Alle");

        }
        return newAssetArray
    }

    filterForManufacturerName(manufacturerNameDropDown) {
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        console.log(manufacturerNameDropDown)
        if (manufacturerNameDropDown) {
            if (manufacturerNameDropDown === "Alle") {
                newAssetArray = shells;
            } else {
                shells.forEach((element) => {
                    if (element["Nameplate"]) {
                        if (
                            element["Nameplate"]["ManufacturerName"].search(
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
            index.render(<Main/>);
        }
    }

    searchForManufacturerName() {
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("content"));
        let manufacturerNameSearchField = document
            .getElementById("manufacturerNameSearchField")
            .value.toLowerCase();

        if (manufacturerNameSearchField) {
            shells.forEach((element) => {
                if (element["Nameplate"]) {
                    if (
                        element["Nameplate"]["ManufacturerName"]
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
            index.render(<Main/>);
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
            index.render(<Main/>);
        }
    }

    sortAsYear(upOrDown) {
        //let upOrDown = document.getElementById("sortByYear").value;
        //document.getElementById("up").style.background = ""
        document.getElementById("up").style.fontWeight = ""
        //document.getElementById("up").style.color = ""
        //document.getElementById("down").style.background = ""
        //document.getElementById("down").style.color = ""
        document.getElementById("down").style.fontWeight = ""
        let shells = JSON.parse(window.sessionStorage.getItem("content"));
        let newAssetDateArray = [];
        let newAssetWithoutDateArray = [];


        document.getElementById(upOrDown).style.fontWeight = "bold";
        //document.getElementById(upOrDown).style.background = "#030d6c"
        //document.getElementById(upOrDown).style.color = "white"

        shells.forEach((element) => {
            if (element["Nameplate"] && element["Nameplate"]["YearOfConstruction"]) {
                if (element["Nameplate"]["YearOfConstruction"].length === 4) {
                    // Jahr formatieren
                    element["Nameplate"]["YearOfConstruction"] = element["Nameplate"]["YearOfConstruction"] + "-01-01";
                    newAssetDateArray.push(element);
                } else if (element["Nameplate"]["YearOfConstruction"].length === 7) {
                    // Jahr und Monat formatieren
                    element["Nameplate"]["YearOfConstruction"] = element["Nameplate"]["YearOfConstruction"] + "-01";
                    newAssetDateArray.push(element);
                } else if (element["Nameplate"]["YearOfConstruction"].length === 10) {
                    // Datum ist bereits im richtigen Format
                    element["Nameplate"]["YearOfConstruction"] = element["Nameplate"]["YearOfConstruction"];
                    newAssetDateArray.push(element);
                } else {
                    newAssetWithoutDateArray.push(element)
                }
            }
        });


        let sortedDates = []
        console.log("Sortiert:")
        if (upOrDown === "up") {
            sortedDates = newAssetDateArray.sort((a, b) => {
                const dateA = new Date(a.Nameplate.YearOfConstruction);
                const dateB = new Date(b.Nameplate.YearOfConstruction);
                return dateA - dateB;
            });
        }
        if (upOrDown === "down") {
            sortedDates = newAssetDateArray.sort((a, b) => {
                const dateA = new Date(a.Nameplate.YearOfConstruction);
                const dateB = new Date(b.Nameplate.YearOfConstruction);
                return dateB - dateA;
            });
        }

        sortedDates.forEach((element) => {
            if (element["Nameplate"]) {
                if (element["Nameplate"]["YearOfConstruction"]) {
                    console.log(element["Nameplate"]["YearOfConstruction"])
                }
            }
        })
        sortedDates = sortedDates.concat(newAssetWithoutDateArray);
        console.log(newAssetWithoutDateArray)
        console.log(sortedDates)

        if (sortedDates.length === 0) {
            //Error Handling
            alert("The assets cannot be sorted because they do not have a date");
        } else {
            window.sessionStorage.setItem("content", JSON.stringify(sortedDates));
            index.render(<Main/>);
        }
    }


    render() {
        return (
            <div className="px-3 py-1 d-flex flex-row shadow-sm bg-light align-items-center justify-content-start">
                <Dropdown
                    className="my-dropdown"
                    autoClose="true"
                    variant="light"
                    align="end"
                >
                    <Dropdown.Toggle id="dropdown-autoclose-true">
                        Jahr
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <DropdownItem id={"up"} onClick={() => this.sortAsYear("up")}>älteste zuerst</DropdownItem>
                        <DropdownItem id={"down"} onClick={() => this.sortAsYear("down")}>neuste zuerst</DropdownItem>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown
                    className="mx-2 my-dropdown"
                    autoClose="outside"
                    variant="light"
                    align="end"
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
                        {this.getManufactureName().map(element => {
                            return <Dropdown.Item value={element}
                                                  onClick={() => this.filterForManufacturerName(element)}> {element} </Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                {/* Suchfeldleiste */}
                <form autoComplete="off" onBlur={async (event) => {await new Promise(resolve => setTimeout(resolve, 200)); document.getElementById("autoCompleteList").style.display='none';}} onSubmit={(event) => {event.preventDefault()}}>
                    <div className="search-bar-container d-flex flex-row bg-white align-items-center input-group">
                            <input
                                id={"searchField"}
                                className="mr-sm-2 border-0 px-3 py-1 bg-transparent outline-none"
                                type="text"
                                placeholder="Search"
                                aria-label="Search"
                                onKeyUp={this.autoComplete}
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
                                        <path
                                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
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
                    <ul id="autoCompleteList" className="bg-white border rounded shadow-sm"></ul>
                </form>
            </div>
        );
    }
}

export default Filter;