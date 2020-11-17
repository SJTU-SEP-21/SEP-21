import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
// import { history } from './util/history'
import Roompage from './pages/roompage'
import  Registerpage from './pages/registerpage'
import Loginpage from './pages/loginpage'
import Home from './pages/homepage'
import InitPage from "./pages/initpage";
import CmdPage from "./pages/cmdPage";
class BasicRoute extends React.Component {
    render() {
        return (
            <Router>
                {/* <ErrorBoundary> */}
                <Switch>
                    <Route exact path='/' component={InitPage} />
                    <Route exact path='/login' component={Loginpage} />
                    <Route exact path='/singledraw' component={Home} />
                    {/*<Route exact path='/login' component={Loginpage} />*/}
                    <Route exact path='/roomlist' component={Roompage} />
                    <Route exact path='/register' component={Registerpage} />
                    <Redirect from='/*' to='/' />
                </Switch>
                {/* </ErrorBoundary> */}
            </Router>
        )
    }
}

export default BasicRoute