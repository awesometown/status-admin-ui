import React from "react";
import { Link } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import {PageHeader, Panel, Button, Grid, Col, Row, Table} from "react-bootstrap";
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
					for (let service of result.data.data) {
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

		let content;
		if (this.state.loaded) {
			content = <IncidentList incidents={this.state.incidents} servicesMap={this.state.servicesMap}/>
		} else {
			content = null;
		}

		return (
			<div id="content">
				<LinkContainer to="/incidents/new"><Button style={buttonStyle}>New Incident</Button></LinkContainer>
				<PageHeader>Incidents</PageHeader>
				{content}
			</div>
		);
	}
});

var IncidentList = React.createClass({
	render: function () {
		let incidentNodes = this.props.incidents.map(incident => <Incident key={incident.id} incident={incident}
																		   servicesMap={this.props.servicesMap}/>);
		return (
			<Row>
				<Col mdOffset={1} md={10}>
					{incidentNodes}
				</Col>
			</Row>
		);
	}
});

var Incident = React.createClass({
	render: function () {
		let map = this.props.servicesMap;
		let serviceNodes = this.props.incident.affectedServiceIds.map(serviceId => <li key={serviceId}>{map[serviceId]}</li>);
		let lastMessage = this.props.incident.incidentUpdates[0].description;



		return (
			<Panel>
				<Grid fluid={true}>
					<Row>
						<Col md={12}>
							<p style={{float: "right", align: "right"}}>Updated {moment(this.props.incident.updatedAt).fromNow()}</p>
							<h3><Link to={"/incidents/"+this.props.incident.id}>{this.props.incident.title}</Link></h3>
						</Col>
						</Row>

					<Row>
						<Col md={5}>

							<h4>{this.props.incident.serviceStatusId}</h4>

							<p><strong>{this.props.incident.state}</strong> - {lastMessage}</p>
						</Col>
						<Col md={3}>



							<p>Affected Services:</p>
							<ul>
								{serviceNodes}
							</ul>
						</Col>
					</Row>
				</Grid>
			</Panel>
		);
	}
});