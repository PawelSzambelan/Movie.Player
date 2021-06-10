import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {PATH_FOR_HOME_VIEW, PATH_FOR_LOGIN_VIEW, PATH_FOR_PLAYER_VIEW} from "../constants/routerPaths";
import {LoginView} from "../LoginView/LoginView";
import {HomeView} from "../HomeView/HomeView";
import {PlayerRoutes} from "../Player/PlayerRoutes";

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
                <Route path={PATH_FOR_PLAYER_VIEW} exact>
                    <PlayerRoutes />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
