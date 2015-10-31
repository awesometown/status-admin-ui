import React from "react";
import { Link } from "react-router";
import {Jumbotron, Grid, Col, Row, Table} from "react-bootstrap"


export default React.createClass({
	render: function () {
		return (
			<div className="container" role="main">
				<Jumbotron>
					<h1>EADP Social Service Status</h1>

					<p>How's it going?</p>
				</Jumbotron>
				<PageContent/>
			</div>
		);
	}
});

var PageContent = React.createClass({
	render: function () {
		return (<Grid>
			<Row>
				<Col md={8}>
					<IncidentList incidents={INCIDENTS.data}/>
				</Col>
				<Col md={4}>
					<ServicesList services={SERVICES.data}/>
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
			<Link to={`/incidents/${incident.id}`}>
				<div className={className}>
					<p className="issue-state">{incident.state}</p>
					<h2>{incident.title}</h2>
					<p className="issue-updated">last updated {incident.updatedAt}</p>
				</div>
			</Link>
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

var INCIDENTS = {
	"data": [
		{
			"id": "ecb25105-b676-42d6-a29b-8939fc66f617",
			"title": "Herp",
			"state": "identified",
			"serviceStatusId": "degraded",
			"affectedServiceIds": [],
			"createdAt": "2015-10-26T16:41:12.502Z",
			"updatedAt": "2015-10-26T16:59:57.985Z",
			"incidentUpdates": [
				{
					"id": "5470a53d-d8da-4e22-9f9f-edbb173fba7e",
					"description": "asdfasdf",
					"state": "identified",
					"updatedBy": "ok",
					"createdAt": "2015-10-26T16:59:57.985Z",
					"updatedAt": "2015-10-26T16:59:57.985Z"
				},
				{
					"id": "74769cbb-7443-43a4-ae17-e015525ad540",
					"description": "zxcvzxcv",
					"state": "resolved",
					"updatedBy": "ok",
					"createdAt": "2015-10-26T16:59:45.642Z",
					"updatedAt": "2015-10-26T16:59:45.642Z"
				},
				{
					"id": "57797b49-5808-4d7e-975a-df38a19672bc",
					"description": "asdfasdf",
					"state": "monitoring",
					"updatedBy": "ok",
					"createdAt": "2015-10-26T16:59:02.180Z",
					"updatedAt": "2015-10-26T16:59:02.180Z"
				},
				{
					"id": "7e7f5731-f613-4bc2-900d-1845601f4130",
					"description": "vzxcvzxcv",
					"state": "monitoring",
					"updatedBy": "ok",
					"createdAt": "2015-10-26T16:56:22.074Z",
					"updatedAt": "2015-10-26T16:56:22.074Z"
				},
				{
					"id": "cddae271-a6f4-4199-b16a-a0ad9ca962b3",
					"description": "xcvzx",
					"state": "identified",
					"updatedBy": "ok",
					"createdAt": "2015-10-26T16:54:55.602Z",
					"updatedAt": "2015-10-26T16:54:55.602Z"
				},
				{
					"id": "5498d28c-93be-4c8f-952a-a478cb5fe48b",
					"description": "",
					"state": "investigating",
					"updatedBy": "ok",
					"createdAt": "2015-10-26T16:54:29.941Z",
					"updatedAt": "2015-10-26T16:54:29.941Z"
				},
				{
					"id": "1587f8f6-6da2-44db-97f3-5ca32330d580",
					"description": "asdfa",
					"state": "investigating",
					"updatedBy": "degraded",
					"createdAt": "2015-10-26T16:42:35.055Z",
					"updatedAt": "2015-10-26T16:42:35.055Z"
				},
				{
					"id": "5ac544e6-b4c9-4c4d-adad-2cce110344b1",
					"description": "asdfasfda",
					"state": "investigating",
					"updatedBy": "minor",
					"createdAt": "2015-10-26T16:42:23.809Z",
					"updatedAt": "2015-10-26T16:42:23.809Z"
				},
				{
					"id": "08f0991f-05e2-44c0-b45a-7dd1ef360567",
					"description": "Derp",
					"state": "investigating",
					"updatedBy": "degraded",
					"createdAt": "2015-10-26T16:41:12.502Z",
					"updatedAt": "2015-10-26T16:41:12.502Z"
				}
			]
		}
	]
};

var SERVICES = {
	"data": [
		{
			"id": "034db69f-9a6e-48be-b154-ded387ca1b2e",
			"name": "asdf",
			"description": "asdf",
			"serviceStatus": {
				"id": "ok",
				"name": "Operational",
				"displayColor": "2FCC66"
			},
			"createdAt": "2015-10-24T22:08:43.703Z",
			"updatedAt": "2015-10-24T22:08:43.703Z"
		}
	]
}
