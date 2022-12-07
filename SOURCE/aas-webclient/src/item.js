import React from 'react';

class Item extends React.Component {
    render() {
        return (
            <div className={"item"}>
                <p>{this.props.name}</p>
            </div>
        );
    }
}

export default Item;