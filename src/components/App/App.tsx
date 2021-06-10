import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {PATH_FOR_HOME_VIEW, PATH_FOR_LOGIN_VIEW, PATH_FOR_PLAYER_VIEW} from "../constants/routerPaths";
import {SplashView} from "../SplashView/SplashView";
import {HomeView} from "../HomeView/HomeView";
import {PlayerRoutes} from "../Player/PlayerRoutes";
import {THEME} from "../constants/ThemeMUI";
import {MuiThemeProvider} from "@material-ui/core";

export function App() {
    return (
        <Router>
                <MuiThemeProvider theme={THEME}>
                    <Switch>
                        <Route path={PATH_FOR_LOGIN_VIEW} exact>
                            <SplashView/>
                        </Route>
                        <Route path={PATH_FOR_HOME_VIEW} exact>
                            <HomeView/>
                        </Route>
                        <Route path={PATH_FOR_PLAYER_VIEW} exact>
                            <PlayerRoutes/>
                        </Route>
                    </Switch>
                </MuiThemeProvider>
        </Router>
    );
}
