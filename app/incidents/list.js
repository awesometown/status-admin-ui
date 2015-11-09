import React from "react";
import { Link } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import {PageHeader, Button, Grid, Col, Row, Table} from "react-bootstrap";
import StatusClient from "../clients/statusclient";
import moment from "moment";

export default React.createClass({
	getInitialState: function () {
		return {
			incidents: [],
			services: [],
			loaded: false
		};
	},

	componentDidMount: function () {
		let statusClient = new StatusClient("http://localhost:9000");
		let incidentsPromise = statusClient.getActiveIncidents()
			.then(result => {
				if (this.isMounted()) {
					this.setState({incidents: result.data.data});
					console.log(result);
				}
			})
			.catch(result => console.log(result));
		let servicesPromise = statusClient.getServices()
			.then(result => {
				if (this.isMounted()) {
					let servicesMap = {};
					for(let service of result.data.data) {
						servicesMap[service.id] = service.name;
					}
					this.setState({servicesMap: servicesMap});
				}
			})
			.catch(result => console.log(result));
		Promise.all([incidentsPromise, servicesPromise]).then(values => this.setState({loaded: true}));
	},

	render: function () {
		var buttonStyle = {
			float: "right",
			marginTop: "10px"
		};

		let incidentNodes;
		if(this.state.loaded) {
			incidentNodes = this.state.incidents.map(incident => <Incident key={incident.id} incident={incident} servicesMap={this.state.servicesMap}/>);
		} else {
			incidentNodes = [];
		}

		return (
			<div id="incident-list">
				<LinkContainer to="/incidents/new"><Button style={buttonStyle}>New Incident</Button></LinkContainer>
				<PageHeader>Incidents</PageHeader>
				<Grid>
					{incidentNodes}
				</Grid>
			</div>
		);
	}
});

var Incident = React.createClass({
	render: function () {
		let map = this.props.servicesMap;
		let serviceNodes = this.props.incident.affectedServiceIds.map(serviceId => <li>{map[serviceId]}</li>);
		let lastMessage = this.props.incident.incidentUpdates[0].description;

		return (
			<Row>
				<Col md={4}>
					<h3><Link to={"/incidents/"+this.props.incident.id}>{this.props.incident.title}</Link></h3>
					<h4>{this.props.incident.serviceStatusId}</h4>

					<p><strong>{this.props.incident.state}</strong> - {lastMessage}</p>
				</Col>
				<Col md={4}>
					<p>Updated {moment(this.props.incident.updatedAt).fromNow()}</p>

					<p>Affected Services:</p>
					<ul>
						{serviceNodes}
					</ul>
				</Col>
			</Row>
		);
	}
});