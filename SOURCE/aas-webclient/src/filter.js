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
                <h3>Filters</h3>
                {/* Suchfeldleiste */}
                <input id={"searchField"} type={"text"} placeholder={"Search"}/>
                <button class={"btn btn-primary"} onClick={this.filterForName}> Search</button>

                {/* filter optionen */}

            </div>
        );
    }

}

export default Filter;
