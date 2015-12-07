import "./theme.css";
import "./admin.css";

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, Link, History } from "react-router";

import AdminDashboard from "./dashboard";

import IncidentList from "./incidents/list";
import NewIncident from "./incidents/new";
import UpdateIncident from "./incidents/update";

import MaintenanceList from "./maintenance/list";
import NewMaintenance from "./maintenance/new";

import ServiceList from "./services/list";
import NewService from "./services/new";
import ViewService from "./services/details";

import AdminApp from "./components/AdminApp";
import Login from "./components/Login";


import { auth, statusClient, history } from "./globals";

function requireAuth(nextState, replaceState) {
	if (!auth.loggedIn()) {
		replaceState({nextPathname: nextState.location.pathname}, "/login");
	}
}

ReactDOM.render((
		<Router history={history}>
			<Route path="/login" component={Login}/>
			<Route path="/" component={AdminApp} onEnter={requireAuth}>

				<IndexRoute component={AdminDashboard}/>

				<Route path="incidents" component={IncidentList}/>
				<Route path="incidents/new" component={NewIncident}/>
				<Route path="incidents/:incidentId" component={UpdateIncident}/>

				<Route path="maintenance" component={MaintenanceList}/>
				<Route path="maintenance/new" component={NewMaintenance}/>

				<Route path="services" component={ServiceList}/>
				<Route path="services/new" component={NewService}/>
				<Route path="services/:serviceId" component={ViewService}/>

			</Route>
		</Router>
	), document.getElementById("app-container")
);
