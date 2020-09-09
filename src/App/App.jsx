import React, { useEffect } from 'react';
import {Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="jumbotron">
            <nav className="navbar navbar-expand-sm bg-light">

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link 1</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link 2</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            {/*<Link to="/login">Logout</Link>*/}
                        </a>
                    </li>
                </ul>

            </nav>
            <div className="container">
                <div className="col-md-12">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export { App };