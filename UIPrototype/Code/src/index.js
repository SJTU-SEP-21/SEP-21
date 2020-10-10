import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Registerpage from "./pages/registerpage";
import Loginpage from "./pages/loginpage";
ReactDOM.render(
    //
    <App />,
    // <Loginpage></Loginpage>,
    // <Registerpage></Registerpage>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
