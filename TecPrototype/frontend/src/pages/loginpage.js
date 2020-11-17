import React from 'react';
import Loginform from "../component/loginform";
import { withRouter, Link } from 'react-router-dom'
import "../css/form.css";

class Loginpage extends React.Component{

    render() {
        return (
            <div className="lg-page">
                <div className="lg-container">
                    <div className="lg-box">
                        <h1 className="lg-title">欢迎来到PCLogo！</h1>
                        <br/>
                        <div className="lg-content">
                            <Loginform/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Loginpage);