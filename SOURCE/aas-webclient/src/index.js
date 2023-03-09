import React from 'react';
import ReactDOM from 'react-dom/client';
import Filter from "./filter";
import ItemView from "./itemview";
import Header from "./header"

//import "./style.css";
import "./bootstrap/bootstrap.rtl.min.css"

class Main extends React.Component {
    render() {
        return (
            <div className='vh-100 d-flex flex-column'>
                <Header/>
                <main className='d-flex flex-row flex-fill'>
                    <Filter/>
                    <ItemView/>
                </main>
            </div>);
        
    }
}

export const index = ReactDOM.createRoot(document.getElementById('root'));
index.render(<Main/>);

export function reload() {
    index.render(<Main/>);
}