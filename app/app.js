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

import ServiceList from "./services/list";
import NewService from "./services/new";
import ViewService from "./services/details";

import auth from './auth'

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

const Login = React.createClass({
	mixins: [History],

	getInitialState() {
		return {
			error: false
		}
	},

	handleSubmit(event) {
		event.preventDefault()

		const email = this.refs.email.value
		const pass = this.refs.pass.value

		auth.login(email, pass, (loggedIn) => {
			if (!loggedIn)
				return this.setState({error: true});

			const { location } = this.props;

			if (location.state && location.state.nextPathname) {
				this.history.replaceState(null, location.state.nextPathname)
			} else {
				this.history.replaceState(null, '/')
			}
		})
	},

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label><input ref="email" placeholder="email" defaultValue="joe@example.com"/></label>
				<label><input ref="pass" placeholder="password"/></label> (hint: password1)<br />
				<button type="submit">login</button>
				{this.state.error && (
					<p>Bad login information</p>
				)}
			</form>
		)
	}
})

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
