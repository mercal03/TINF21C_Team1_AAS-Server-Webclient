import React from "react";
import {shells} from "./backend";
import button from "bootstrap/js/src/button";

class Filter extends React.Component {

    filterForName() { //Sucht nach einem AAS name
        let searchInput = document.getElementById('searchField').value.toLowerCase(); // zeiht sich den Namen aus dem Inputfeld
        let newAssetArray = [];

        shells.forEach(element => {
                if (element[0].toLowerCase().search(searchInput) !== -1) { // Abfrage ob Suchstring enthalten ist
                    newAssetArray.push(element);
                }
            }
        );
        console.log(newAssetArray);
    }


    render() {
        return (
            <div className="bg-primary-subtle w-25 p-2">

                <h3>Suche:</h3>
                {/* Suchfeldleiste */}
                <form class="form-inline d-md-flex">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-primary my-2 my-sm-0" type="submit" onClick={this.filterForName}>Search</button>
                </form>
                <h3>Filter:</h3>

                {/* filter optionen */}

            </div>
        );
    }

}

export default Filter;
