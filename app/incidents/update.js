import React from "react";
import { Link } from "react-router";
import {PageHeader, Grid, Col, Row, Table} from "react-bootstrap";
import axios from "axios";
import SERVICES from "../data/services";

export default React.createClass({
	getInitialState: function () {
		return {
			incident: {
				"id": "",
				"title": "",
				"state": "",
				"serviceStatusId": "",
				"affectedServiceIds": [],
				"createdAt": "",
				"updatedAt": "",
				"incidentUpdates": []
			}
		};
	},

	componentDidMount: function () {
		var incidentId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
		axios.get("http://localhost:9000/api/incidents/" + incidentId)
			.then(result => {
				if (this.isMounted()) {
					this.setState({incident: result.data});
					console.log(result);
				}
			})
			.catch(result => console.log(result));
	},

	render: function () {
		return (
			<div id="content">
				<PageHeader>{this.state.incident.title}</PageHeader>
				<IncidentUpdateForm incident={this.state.incident}/>
				<IncidentUpdateList incidentUpdates={this.state.incident.incidentUpdates}/>
			</div>
		);
	}
});

var IncidentUpdateForm = React.createClass({
	render: function () {
		return (
			<form id="update-incident-form" role="form">
				<p>State: {this.props.incident.state}</p>

				<p>Service Status: {this.props.incident.serviceStatusId}</p>

				<p>Affected Services:</p>
				<AffectedServiceList affectedServices={SERVICES.data}/>

				<p>Post an Update</p>

				<div className="form-group">
					<label for="description">Update text</label>
					<textarea className="form-control" name="description" id="description"></textarea>
				</div>
				<StateSelector/>

				<button value="Update" name="Create" id="submit" className="btn btn-defaulkt">Update</button>
			</form>
		);
	}
});

var AffectedServiceList = React.createClass({
	render: function () {
		var affectedServiceNodes = this.props.affectedServices.map(service => <li key={service.id}>{service.name}</li>);

		return (
			<ul>
				{affectedServiceNodes}
			</ul>
		);
	}
});

var StateSelector = React.createClass({
	render: function () {
		return (
			<div className="form-group">
				<label htmlFor="state">State</label>
				<select className="form-control" id="state" name="state">
					<option value="state">state</option>
				</select>
			</div>);
	}
});

var StatusSelector = React.createClass({
	render: function () {
		return (
			<div className="form-group">
				<label htmlFor="status">New Services Status</label>
				<select className="form-control" id="status" name="serviceStatusId">
					<option value="{status.id}">status.name</option>
				</select>
			</div>
		);
	}
});


var IncidentUpdateList = React.createClass({
	render: function () {
		var updateNodes = this.props.incidentUpdates.map(update => <li key={update.id}>{update.description}</li>);
		return (<ul>{updateNodes}</ul>);
	}
});