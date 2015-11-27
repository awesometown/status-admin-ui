import React from "react";
import { Link } from "react-router";
import {PageHeader, Button, Grid, Col, Row, Table} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { statusClient } from "../globals";

export default React.createClass({

	getInitialState: function () {
		return {
			services: []
		};
	},

	componentDidMount: function () {
		statusClient.getServices()
			.then(result => {
				if (this.isMounted()) {
					this.setState({services: result.data.data});
					console.log(result);
				}
			})
			.catch(result => console.log(result));
	},

	render: function () {
		var buttonStyle = {
			float: "right",
			marginTop: "10px"
		};

		var serviceNodes = this.state.services.map(service =>
			<li key={service.id}><Link to={"/services/" + service.id}>{service.name}</Link></li>);
		return (
			<div id="services-list">
				<LinkContainer to="/services/new"><Button style={buttonStyle}>New Service</Button></LinkContainer>
				<PageHeader>Services</PageHeader>
				<ul>
					{serviceNodes}
				</ul>
			</div>
		);
	}
});