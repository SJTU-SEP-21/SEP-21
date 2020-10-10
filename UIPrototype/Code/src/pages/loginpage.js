import React from 'react';
import Loginform from "../component/loginform";

import "../css/form.css";

class Loginpage extends React.Component{

    render() {
        return (
            <div className="lg-page">
                <div className="lg-container">
                    <div className="lg-box">
                        <h1 className="lg-title">登录</h1>
                        <div className="lg-content">
                            <Loginform/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Loginpage;