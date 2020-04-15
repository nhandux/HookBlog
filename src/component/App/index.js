import React from 'react';
import { Route, Switch, Router } from "react-router-dom";
import {history} from '../../_helpers/history';
import Login from '../Login';
import AdminLayout from '../Admin';
import ViewLayout from '../Client';

function App() {
  	return (
		  <Router history={history}>
			<Switch>
				<Route
					path="/login"
					name="Login Page"
					component={() => <Login />}
				/>
				<Route
					exact
					path="/"
					name="Home Page" 
					component={() => <ViewLayout />}
				/>
				<Route
					path="/wp-admin"
					name="Admin Page"
					component={() => <AdminLayout />}
				/>
			</Switch>
		</Router>
  	);
}

export default App;
