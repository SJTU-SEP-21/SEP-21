import React from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import {Link, withRouter} from "react-router-dom";
import CmdText from "../component/cmd";

class CmdPage  extends React.Component {
    render() {
        return (
            <div>
                <CmdText/>
            </div>

        );
    }
}

export default withRouter(CmdPage)