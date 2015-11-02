import React from "react";
import { Link } from "react-router";
import {PageHeader, Grid, Col, Row, Table} from "react-bootstrap"
import INCIDENTS from "../data/incidents"

export default React.createClass({
	render: function () {

		var incidentNodes = INCIDENTS.data.map(incident => <Incident key={incident.id} incident={incident}/>);
		return (
			<div id="incident-list">
				<PageHeader>Incidents - <Link to="/incidents/new">Post a new incident</Link></PageHeader>
				<Grid>
					{incidentNodes}
				</Grid>
			</div>
		);
	}
});

var Incident = React.createClass({
	render: function () {
		return (
			<Row>
				<Col md={4}>
					<h3>{this.props.incident.title}</h3>
					<h5>{this.props.incident.serviceStatusId}</h5>

					<p>**{this.props.incident.state}** - Last message goes here</p>
				</Col>
				<Col md={4}>
					<p>{this.props.incident.updatedAt}</p>

					<p>Affected Services:</p>
					<ul>
						<li>todo</li>
					</ul>
				</Col>
			</Row>
		);
	}
});