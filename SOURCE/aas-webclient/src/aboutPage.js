import React from "react";
import HeaderAboutPage from "./headerAboutPage";

class AboutPage extends React.Component {
    render() {
        return (
            <div className='vh-100 d-flex flex-column'>
                <HeaderAboutPage/>
                <main className='d-flex overflow-hidden mx-auto m-5'>
                    <div className="card text-center">
                        <div className="card-header">
                            This website is the outcome of a 2023 study project
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Our Team</h5>
                            <p className="card-text">
                                <ul className="list-group">
                                    <li className="list-group-item">Samara Dominik</li>
                                    <li className="list-group-item">Tom Engelmann</li>
                                    <li className="list-group-item">Severin Helms</li>
                                    <li className="list-group-item">Marcel Hintze</li>
                                    <li className="list-group-item">Anja Niedermeier</li>
                                    <li className="list-group-item">Martin Rittmann</li>
                                </ul>
                            </p>
                            <a href="https://github.com/mercal03/TINF21C_Team1_AAS-Server-Webclient" className="btn btn-primary">Visit the project on Github</a>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default AboutPage;