import React from "react";
import { Link } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import {PageHeader, Button, Grid, Col, Row, Table} from "react-bootstrap";
import axios from "axios";
import moment from "moment";

export default React.createClass({
	getInitialState: function () {
		return {
			incidents: []
		};
	},

	componentDidMount: function () {
		axios.get("http://localhost:9000/api/incidents")
			.then(result => {
				if (this.isMounted()) {
					this.setState({incidents: result.data.data});
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

		var incidentNodes = this.state.incidents.map(incident => <Incident key={incident.id} incident={incident}/>);
		return (
			<div id="incident-list">
				<LinkContainer to="/incidents/new"><Button style={buttonStyle}>New Service</Button></LinkContainer>
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
		return (
			<Row>
				<Col md={4}>
					<h3><Link to={"/incidents/"+this.props.incident.id}>{this.props.incident.title}</Link></h3>
					<h5>{this.props.incident.serviceStatusId}</h5>

					<p>**{this.props.incident.state}** - Last message goes here</p>
				</Col>
				<Col md={4}>
					<p>Updated {moment(this.props.incident.updatedAt).fromNow()}</p>

					<p>Affected Services:</p>
					<ul>
						<li>todo</li>
					</ul>
				</Col>
			</Row>
		);
	}
});