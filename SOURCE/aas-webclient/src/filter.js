import React from "react";
import {index, Main} from "./index";

class Filter extends React.Component {

    filterForName() { //Sucht nach einem AAS name
        let searchInput = document.getElementById('searchField').value.toLowerCase();// zieht sich den Namen aus dem Inputfeld über die ID
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));

        shells.forEach(element => {
                if (element["idShort"].toLowerCase().search(searchInput) !== -1) { // Abfrage ob Suchstring enthalten ist
                    newAssetArray.push(element);
                }
            }
        );
        if (newAssetArray.length === 0) { //Error Handling
            alert("No results found");
        } else {
            window.sessionStorage.setItem("content", JSON.stringify(newAssetArray));
            index.render(<Main/>);
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
                <form className="form-inline d-md-flex" onSubmit={event => event.preventDefault()}>
                    <input id={"searchField"} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-primary my-2 my-sm-0" type="submit" onClick={this.filterForName}>Search</button>
                </form>
                <h3>Filter:</h3>

                <table>
                    <tbody>
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
                    </tbody>
                </table>

                {/* filter optionen */}

            </div>
        );
    }

}

export default Filter;
