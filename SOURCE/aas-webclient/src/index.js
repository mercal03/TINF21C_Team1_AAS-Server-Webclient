import React from 'react';
import ReactDOM from 'react-dom/client';
import "./bootstrap/bootstrap.rtl.min.css";
import "./style.css";
import {
    BrowserRouter,
    Routes, //replaces "Switch" used till v5
    Route,
} from "react-router-dom";
import AboutPage from "./aboutPage.js";
import Home from "./home.js";

export class Main extends React.Component {
    render() {
        return (
            <div className='vh-100 d-flex flex-column'>
                <Home/>
                {/*<BrowserRouter>*/}
                {/*    <Routes>*/}
                {/*        <Route element={<Home/>}/>*/}
                {/*        <Route path="/" element={<Home />} />*/}
                {/*        <Route path="/about" element={<AboutPage />} />*/}
                {/*    </Routes>*/}
                {/*</BrowserRouter>*/}
            </div>
        );
    }
}

export let index = ReactDOM.createRoot(document.getElementById('root'));
index.render(<Main/>);