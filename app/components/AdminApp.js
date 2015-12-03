import React from "react";
import { History } from "react-router";
import { Navbar, NavBrand, Nav, NavItem, Grid, Row, Col } from "react-bootstrap";
import {IndexLinkContainer, LinkContainer} from "react-router-bootstrap";
import { auth } from "../globals";

export default React.createClass({
	mixins: [History],

	onLogout() {
		auth.logout();
		this.history.replaceState(null, "/login");
	},

	render() {
		return (
			<div id="app">
				<Navbar fixedTop={true} inverse={true} fluid={true}>
					<NavBrand>Status Dashboard</NavBrand>
					<Nav pullRight>
						<NavItem onClick={this.onLogout}>Logout</NavItem>
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
								<LinkContainer to="/maintenance">
									<NavItem eventKey={3}>Maintenance</NavItem>
								</LinkContainer>
								<LinkContainer to="/services">
									<NavItem eventKey={4}>Services</NavItem>
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