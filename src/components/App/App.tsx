import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {PATH_FOR_HOME_VIEW, PATH_FOR_LOGIN_VIEW} from "../constants/routerPaths";
import {LoginView} from "../LoginView/LoginView";
import {HomeView} from "../HomeView/HomeView";

function App() {
    return (
        <Router>
            <Switch>
                <Route path={PATH_FOR_LOGIN_VIEW} exact>
                    <LoginView />
                </Route>
                <Route path={PATH_FOR_HOME_VIEW} exact>
                    <HomeView />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
