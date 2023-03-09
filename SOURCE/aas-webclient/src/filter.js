import React from "react";
import {shells} from "./backend";
import button from "bootstrap/js/src/button";

class Filter extends React.Component {

    filterForName() { //Sucht nach einem AAS name
        let searchInput = document.getElementById('searchField').value.toLowerCase();// zieht sich den Namen aus dem Inputfeld über die ID
        let newAssetArray = [];

        shells.forEach(element => {
                if (element[0].toLowerCase().search(searchInput) !== -1) { // Abfrage ob Suchstring enthalten ist
                    newAssetArray.push(element[0]);
                }
            }
        );
        if (newAssetArray.length === 0) { //Error Handling
            alert("No results found");
        } else {
            console.log(newAssetArray);
            alert(newAssetArray);
        }
    }

    filterOptions(){
        //tbd
    }


    render() {
        return (
            <div className="bg-primary-subtle w-25 p-2">

                <h3>Suche:</h3>
                {/* Suchfeldleiste */}
                <form class="form-inline d-md-flex">
                    <input id="searchField" className="form-control mr-sm-2" type="search" placeholder="Search"
                           aria-label="Search"/>
                    <button class="btn btn-primary my-2 my-sm-0" type="submit" onClick={this.filterForName}>Search
                    </button>
                </form>
                <h3>Filter:</h3>

                <table>
                    <tr>
                        <td>
                            <h4> Server </h4>
                        </td>
                        <td>
                            <select id={"selectServer"}>
                                <option></option>
                                <option></option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Weitere Filter:
                        </td>
                        <td>
                            placeholder
                        </td>
                    </tr>
                </table>

                {/* filter optionen */}

            </div>
        );
    }

}

export default Filter;
