import React from 'react';
import Item from "./item";
import {getAllShells} from "./backend";

export let shells = [];

class ItemView extends React.Component {
    state = {
        displayedContent: []
    }

    componentDidMount() {
        getAllShells().then(response => {
            shells = response;
            this.setState({
                displayedContent: response
            })
        })
    }

    render() {
        return (
            <div className="p-2 flex-fill">
            <h3>Assets</h3>
            <div id={"itemview"}>
                {this.state.displayedContent.map(id => {
                    return <Item name={id["idShort"]}/>
                })}
            </div>
            </div> 
        );
    }
}

export default ItemView;