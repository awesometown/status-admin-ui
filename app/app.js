import "./theme.css";
import "./admin.css";

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, Link, History } from "react-router";

import AdminDashboard from "./components/AdminDashboard";

import IncidentListPage from "./components/incidents/IncidentListPage";
import IncidentCreatePage from "./components/incidents/IncidentCreatePage";
import IncidentDetailsPage from "./components/incidents/IncidentDetailsPage";

import MaintenanceList from "./components/incidents/MaintenanceListPage";
import NewMaintenance from "./components/incidents/MaintenanceCreatePage";
import UpdateMaintenance from "./components/incidents/MaintenanceDetailsPage";

import ServiceList from "./components/services/ServiceListPage";
import NewService from "./components/services/ServiceCreatePage";
import ViewService from "./components/services/ServiceDetailsPage";

import AdminApp from "./components/AdminApp";
import Login from "./components/Login";

import PublicDashboard from "./components/public/PublicDashboard";
import PublicIncidentDetailsPage from "./components/public/PublicIncidentDetailsPage"

import { auth, statusClient, history } from "./globals";

function requireAuth(nextState, replaceState) {
	if (!auth.loggedIn()) {
		replaceState({nextPathname: nextState.location.pathname}, "/login");
	}
}

ReactDOM.render((
		<Router history={history}>
			<Route path="/login" component={Login}/>
			<Route path="/admin" component={AdminApp} onEnter={requireAuth}>

				<IndexRoute component={AdminDashboard}/>

				<Route path="/admin/incidents" component={IncidentListPage}/>
				<Route path="/admin/incidents/new" component={IncidentCreatePage}/>
				<Route path="/admin/incidents/:incidentId" component={IncidentDetailsPage}/>

				<Route path="/admin/maintenance" component={MaintenanceList}/>
				<Route path="/admin/maintenance/new" component={NewMaintenance}/>
				<Route path="/admin/maintenance/:incidentId" component={UpdateMaintenance}/>

				<Route path="/admin/services" component={ServiceList}/>
				<Route path="/admin/services/new" component={NewService}/>
				<Route path="/admin/services/:serviceId" component={ViewService}/>
			</Route>

			<Route path="/" component={PublicDashboard}/>
			<Route path="/incidents/:incidentId" component={PublicIncidentDetailsPage}/>
		</Router>
	), document.getElementById("app-container")
);
