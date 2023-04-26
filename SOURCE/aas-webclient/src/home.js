import React from 'react';
import Header from "./header";
import "./bootstrap/bootstrap.rtl.min.css";
import "./style.css";
import ItemView from "./itemview";
import AssetBody from "./assetBody";
import Filter from "./filter";

export class Home extends React.Component {
    render() {
        return (
            <div className='vh-100 d-flex flex-column'>
                <Header/>
                <Filter/>
                <main className='d-flex flex-row flex-fill overflow-hidden'>
                    <ItemView/>
                    <AssetBody/>
                </main>
            </div>
        );
    }
}

export default Home;