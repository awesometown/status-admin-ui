import React from "react";

import { Panel, Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router";

import moment from "moment";

export default React.createClass({

	propTypes: {
		incident: React.PropTypes.object.isRequired,
		servicesMap: React.PropTypes.object.isRequired
	},

	getDefaultProps: function() {
		return {
			incident: {},
			servicesMap: {}
		};
	},

	componentDidMount: function () { },

	render: function () {

		console.log("Incident: %O", this.props.incident);
		console.log("Services: %O", this.props.servicesMap);

		let map = this.props.servicesMap;
		let affectedServices = this.props.incident.affectedServiceIds;

		console.log("Map: %O", map);
		console.log("Affected Services: %O", affectedServices);

		let serviceNodes = affectedServices.map(serviceId =>
			<li key={ serviceId }>{ map[serviceId] }</li>);

		console.log("Service Nodes: %O", serviceNodes);

		let lastMessage = this.props.incident.incidentUpdates[0].description;
		console.log("Last Message: %s", lastMessage);

		let servicesPanel = null;
		if (affectedServices.length > 0) {
			servicesPanel = (
				<Panel style={{fontSize:"90%", padding:"0px", backgroundColor:"#EEEEEE"}}>
					<h5 style={{marginTop:"0px"}}>Affected Services:</h5>
					<ul style={{paddingLeft:"20px", marginTop:"5px"}}>
						{ serviceNodes }
					</ul>
				</Panel>
			);
		}

		console.log("Services Panel: %O", servicesPanel);

		let fromNow = moment(this.props.incident.updatedAt).fromNow();
		console.log("From Now: %s", fromNow);

		let startTime = (
			<span />
		);
		if(this.props.incident.startTime !== undefined) {
			startTime = (
				<p>Starts moment(this.props.incident.startTime).fromNow()</p>
			);
		}
		console.log("Start Time: %s", startTime);

		let incidentId = this.props.incident.id;
		console.log("Incident Id: %s", incidentId);

		let incidentTitle = this.props.incident.title;
		console.log("Incident Title: %s", incidentTitle);

		let incidentServiceStatusId = this.props.incident.title;
		console.log("Incident Service Status Id: %s", incidentServiceStatusId);

		let incidentState = this.props.incident.state;
		console.log("Incident State: %s", incidentState);

		let urlPath = this.props.incident.type === 'planned' ? '/admin/maintenance/' : '/admin/incidents/';

		return (
			<Panel>
				<Grid fluid={true}>
					<Row>
						<Col md={12}>
							<p style={{float: "right", align: "right"}}>Updated { fromNow }</p>

							<h3 style={{marginTop: "0px"}}>
								<Link to={ urlPath + incidentId }>{ incidentTitle }</Link>
							</h3>
						</Col>
					</Row>
					<Row>
						<Col md={8}>
							<h4>{ incidentServiceStatusId }</h4>
							<p><strong>{ incidentState }</strong> - { lastMessage }</p>
							{ startTime }
						</Col>
						<Col md={4}>
							{ servicesPanel }
						</Col>
					</Row>
				</Grid>
			</Panel>
		);
	}

});