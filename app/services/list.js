import React from "react";
import { Link } from "react-router";
import {PageHeader, Grid, Col, Row, Table} from "react-bootstrap"
import SERVICES from "../data/services"

export default React.createClass({
	render: function () {

		var serviceNodes = SERVICES.data.map(service => <li key={service.id}>{service.name}</li>);
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