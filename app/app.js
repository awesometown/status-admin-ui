import "./theme.css";
import "./admin.css";

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, Link, History } from "react-router";
import { Navbar, NavBrand, Nav, NavItem, Grid, Row, Col } from "react-bootstrap";
import createHistory from './history';
import AdminDashboard from "./dashboard";
import IncidentList from "./incidents/list";
import NewIncident from "./incidents/new";
import UpdateIncident from "./incidents/update";
import {IndexLinkContainer, LinkContainer} from "react-router-bootstrap";
import Login from "./components/Login";

import ServiceList from "./services/list";
import NewService from "./services/new";
import ViewService from "./services/details";

import { auth, statusClient } from "./globals";

const AdminApp = React.createClass({
	render() {
		return (
			<div id="app">
				<Navbar fixedTop={true} inverse={true} fluid={true}>
					<NavBrand>Status Dashboard</NavBrand>
					<Nav pullRight>
						<LinkContainer to="/logout">
							<NavItem href="#">Logout</NavItem>
						</LinkContainer>
					</Nav>
				</Navbar>
				<Grid fluid={true}>
					<Row>
						<Col sm={3} md={2} className="sidebar">
							<Nav stacked activeKey={1} className="nav-sidebar">
								<LinkContainer to="/">
									<NavItem eventKey={1}>Home</NavItem>
								</LinkContainer>
								<LinkContainer to="/incidents">
									<NavItem eventKey={2} title="Item">Incidents</NavItem>
								</LinkContainer>
								<LinkContainer to="/services">
									<NavItem eventKey={3}>Services</NavItem>
								</LinkContainer>
							</Nav>
						</Col>
						<Col sm={3} smOffset={3} md={6} mdOffset={2} className="main">
							{this.props.children}
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
});

function requireAuth(nextState, replaceState) {
	if (!auth.loggedIn()) {
		replaceState({nextPathname: nextState.location.pathname}, "/login");
	}
}

const Logout = React.createClass({
	componentDidMount() {
		auth.logout()
	},

	render() {
		return <p>You are now logged out</p>
	}
})

ReactDOM.render((
		<Router history={createHistory}>
			<Route path="/login" component={Login}/>
			<Route path="/logout" component={Logout}/>
			<Route path="/" component={AdminApp} onEnter={requireAuth}>
				<IndexRoute component={AdminDashboard}/>
				<Route path="incidents" component={IncidentList}/>
				<Route path="incidents/new" component={NewIncident}/>
				<Route path="incidents/:incidentId" component={UpdateIncident}/>
				<Route path="services" component={ServiceList}/>
				<Route path="services/new" component={NewService}/>
				<Route path="services/:serviceId" component={ViewService}/>
			</Route>
		</Router>
	), document.getElementById("app-container")
);
