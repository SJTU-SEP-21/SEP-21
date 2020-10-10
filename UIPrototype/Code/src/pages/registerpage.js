import React from 'react';
import RegisterFrom from "../component/registerform";

import "../css/form.css";

class Registerpage extends React.Component{

    render() {
        return (
            <div className="lg-page">
                <div className="lg-container">
                    <div className="lg-box">
                        <h1 className="lg-title">注册</h1>
                        <div className="lg-content">
                            <RegisterFrom/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Registerpage;