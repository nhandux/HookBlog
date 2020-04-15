import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import '../../public/admin/coreui/library_coreui.css';

import {userActions} from '../../_actions/user';

import Header from "./partials/header";
import Side from './partials/side';
import Footer from './partials/footer';

import NotFound from './notfound';

import http from '../../_helpers/http';
import {history} from '../../_helpers/history';
import routes from '../../_helpers/route_admin';

function Login() {
    
    const user = useSelector(state => state.authentication.user);
    const dispatch = new useDispatch();

    useEffect(() => {
        if(localStorage.getItem('user') == null)
            history.push('/login');
        else {
            //Checktime expires_at
            dispatch(userActions.checkLogin());
        }
        http.setJwt(http.getJwt());
    }, []);     

    const showRoutes = routes => {
        var result = "";
        result = routes.map((route, index) => {
            return (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            );
        });
        return result;
    };
    
  	return (
        <div className="app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show">
            <Header />
            <div className="app-body">
                <Side />
                <main className="main">
                    <Switch>
                        {showRoutes(routes)}
                        <Route 
                            path="*" 
                            component={() => <NotFound />}
                        />
                    </Switch>
                </main>
            </div>
            <Footer />
        </div>
        
  	);
}

export default Login;