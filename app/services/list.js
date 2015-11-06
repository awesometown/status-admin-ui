import React from "react";
import { Link } from "react-router";
import {PageHeader, Grid, Col, Row, Table} from "react-bootstrap"
import SERVICES from "../data/services"
import axios from "axios";

export default React.createClass({

	getInitialState: function() {
		return {
			services: []
		};
	},

	componentDidMount: function() {
		axios.get("http://localhost:9000/api/services")
		.then(result => {
				this.setState({services: result.data});
				console.log(result);
			})
		.catch(result => console.log(result));
	},

	render: function () {

		//var serviceNodes = SERVICES.data.map(service => <li key={service.id}>{service.name}</li>);
		var serviceNodes = this.state.services.map(service => <li key={service.id}>{service.name}</li>);
		return (
			<div id="services-list">
				<PageHeader>Services</PageHeader>
				<ul>
					{serviceNodes}
				</ul>
				<Link to="/services/new">Create new service</Link>
				{this.props.children}
			</div>
		);
	}
});