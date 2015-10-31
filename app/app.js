import "./theme.css";
import "./admin.css";

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, Link } from "react-router";
import { Navbar, NavBrand, Nav, NavItem, Grid, Row, Col } from "react-bootstrap";
import createBrowserHistory from 'history/lib/createBrowserHistory';
import AdminDashboard from "./dashboard";
import IncidentList from "./incidents";
import {IndexLinkContainer, LinkContainer} from "react-router-bootstrap";

import ServiceList from "./services";


const AdminApp = React.createClass({
	render() {
		return (
			<div id="app">
				<Navbar fixedTop={true} inverse={true} fluid={true}>
					<NavBrand>Status Dashboard</NavBrand>
				</Navbar>
				<Grid fluid={true}>
					<Row>
						<Col sm={3} md={2} className="sidebar">
							<Nav stacked activeKey={1} className="nav-sidebar">
								<IndexLinkContainer>
									<NavItem eventKey={1}>Home</NavItem>
								</IndexLinkContainer>
								<LinkContainer to="incidents">
									<NavItem eventKey={2} title="Item">Incidents</NavItem>
								</LinkContainer>
								<LinkContainer to="services">
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

ReactDOM.render((
		<Router>
			<Route path="/" component={AdminApp}>
				<IndexRoute component={AdminDashboard}/>
				<Route path="incidents" component={IncidentList}/>
				<Route path="services" component={ServiceList}/>
			</Route>
		</Router>
	), document.getElementById("app-container")
);
