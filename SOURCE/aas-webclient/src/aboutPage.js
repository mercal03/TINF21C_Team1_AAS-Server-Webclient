import React from "react";
import HeaderAboutPage from "./headerAboutPage";

class AboutPage extends React.Component {
    render() {
        return (
            <div className='vh-100 d-flex flex-column'>
                <HeaderAboutPage/>
                <main className='d-flex flex-row flex-fill overflow-hidden'>
                    test
                </main>
            </div>
        );
    }
}

export default AboutPage;