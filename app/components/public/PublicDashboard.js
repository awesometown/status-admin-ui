import React from "react";
import { Link } from "react-router";
import {Jumbotron, Grid, Col, Row, Table} from "react-bootstrap";
import moment from "moment";
import { statusClient } from "../../globals";

export default React.createClass({
	getInitialState: function () {
		return {
			services: [],
			incidents: []
		}
	},

	componentDidMount: function () {
		statusClient.getServices()
			.then(result => {
				if (this.isMounted()) {
					this.setState({services: result.data.data});
					console.log(result);
				}
			}).catch(result => console.log(result));

		statusClient.getIncidents()
			.then(result => {
				if (this.isMounted()) {
					this.setState({incidents: result.data.data});

				}
			}).catch(result => console.log(result));
	},

	render: function () {
		return (
			<div className="container" role="main">
				<Jumbotron>
					<h1>EADP Social Service Status</h1>

					<p>How's it going?</p>
				</Jumbotron>
				<PageContent services={this.state.services} incidents={this.state.incidents}/>
			</div>
		);
	}
});

var PageContent = React.createClass({
	render: function () {
		return (<Grid>
			<Row>
				<Col md={8}>
					<IncidentList incidents={this.props.incidents}/>
				</Col>
				<Col md={4}>
					<ServicesList services={this.props.services}/>
				</Col>
			</Row>
		</Grid>);
	}
});

var IncidentList = React.createClass({
	render: function () {
		var incidentNodes = this.props.incidents.map(incident =>
				<Incident key={incident.id} incident={incident}/>
		);
		return (
			<div className="currentIssues">
				{incidentNodes}
			</div>
		);
	}
});

var Incident = React.createClass({
	render: function () {
		var incident = this.props.incident;
		var className = 'alert incident-' + incident.serviceStatusId;
		return (

			<div className={className}>
				<p className="issue-state">{incident.state}</p>

				<h2><Link to={`/incidents/${incident.id}`}>{incident.title}</Link></h2>

				<p className="issue-updated">last updated {moment(incident.updatedAt).fromNow()}</p>
			</div>

		);
	}
});

var ServicesList = React.createClass({
	render: function () {
		var tableRows = this.props.services.map(service => <tr key={service.id}>
			<td>{service.name}</td>
			<td>{service.serviceStatus.name}</td>
		</tr>);

		return (
			<Table>
				<thead>
				<tr>
					<th>Service Name</th>
					<th>Status</th>
				</tr>
				</thead>
				<tbody>
				{tableRows}
				</tbody>
			</Table>
		);
	}
});