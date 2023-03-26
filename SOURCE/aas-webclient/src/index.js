import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from "./header";
import "./bootstrap/bootstrap.rtl.min.css";
import "./style.css";
import ItemView from "./itemview";
import AssetBody from "./assetBody";
export class Main extends React.Component {
    render() {
        return (
            <div className='vh-100 d-flex flex-column'>
                <Header/>
                <main className='d-flex flex-row flex-fill overflow-hidden' style={{marginTop: "85px"}}>
                    <ItemView/>
                    <AssetBody/>
                </main>
            </div>
        );
    }
}

export let index = ReactDOM.createRoot(document.getElementById('root'));
index.render(<Main/>);