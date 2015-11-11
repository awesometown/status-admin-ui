import React from "react";
import { Link } from "react-router";
import {PageHeader, Grid, Col, Row, Table} from "react-bootstrap";
import axios from "axios";
import { StatusClient } from "../globals";

export default React.createClass({
	getInitialState: function () {
		return {
			loaded: false
		};
	},

	componentDidMount: function () {
		let incidentId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
		let incidentsPromise = StatusClient.getIncident(incidentId)
			.then(result => {
				if (this.isMounted()) {
					this.setState({incident: result.data});
					console.log(result);
				}
			})
			.catch(result => console.log(result));
		let servicesPromise = StatusClient.getServices()
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
		var content;
		if (!this.state.loaded) {
			content = (<div>Loading...</div>);
		} else {
			let servicesMap = this.state.servicesMap;
			let affectedServices = this.state.incident.affectedServiceIds.map(serviceId => servicesMap[serviceId]);
			content = (<div id="content">
				<PageHeader>{this.state.incident.title}</PageHeader>

				<p>State: {this.state.incident.state}</p>

				<p>Service Status: {this.state.incident.serviceStatusId}</p>

				<p>Affected Services:</p>
				<AffectedServiceList affectedServices={affectedServices}/>
				<IncidentUpdateForm initialState={this.state.incident.state}
									initialServiceStatusId={this.state.incident.serviceStatusId}/>
				<IncidentUpdateList incidentUpdates={this.state.incident.incidentUpdates}/>
			</div>);
		}

		return content;
	}
});

var IncidentUpdateForm = React.createClass({
	getInitialState: function () {
		return {state: this.props.initialState, serviceStatusId: this.props.initialServiceStatusId, description: ''};
	},

	handleStateChange: function (newState) {
		this.setState({state: newState});
	},

	handleStatusChange: function (newStatus) {
		this.setState({serviceStatusId: newStatus});
	},

	handleDescriptionChange: function (event) {
		this.setState({description: event.target.value});
	},

	onSubmit: function (e) {
		e.preventDefault();
		var location = window.location.href;
		var id = location.substring(location.lastIndexOf('/') + 1);

		var update = { state: this.state.state, serviceStatusId: this.state.serviceStatusId, description: this.state.description };
		StatusClient.updateIncident(id, update)
			.then(response => {
				console.log(response);
			}).catch(response => {
				console.log(response);
			});
	},

	render: function () {
		return (
			<form id="update-incident-form" role="form">
				<p>Post an Update</p>

				<div className="form-group">
					<label htmlFor="description">Update text</label>
					<textarea className="form-control" name="description" id="description"
							  onChange={this.handleDescriptionChange}></textarea>
				</div>
				<StateSelector initialValue={this.props.initialState} onChange={this.handleStateChange}/>
				<StatusSelector initialValue={this.props.initialServiceStatusId} onChange={this.handleStatusChange}/>

				<button value="Update" name="Create" id="submit" className="btn btn-default" onClick={this.onSubmit}>Update</button>
			</form>
		);
	}
});

var AffectedServiceList = React.createClass({
	render: function () {
		let servicesMap = this.props.servicesMap;
		var affectedServiceNodes = this.props.affectedServices.map(service => <li key={service}>{service}</li>);

		return (
			<ul>
				{affectedServiceNodes}
			</ul>
		);
	}
});

var StateSelector = React.createClass({
	handleChange: function () {
		this.props.onChange(this.refs.state.value.trim());
	},

	render: function () {
		var states = ['investigating', 'identified', 'monitoring', 'resolved'];
		var stateNodes = states.map(function (state) {
			return (
				<option key={state} value={state}>{state}</option>
			);
		});
		return (
			<div className="form-group">
				<label htmlFor="state">State</label>
				<select className="form-control" id="state" name="state" ref="state"
						defaultValue={this.props.initialValue} onChange={this.handleChange}>
					{stateNodes}
				</select>
			</div>);
	}
});

var StatusSelector = React.createClass({
	handleChange: function () {
		this.props.onChange(this.refs.status.value.trim());
	},

	render: function () {
		var statuses = ['ok', 'degraded', 'minor', 'major']
		var statusNodes = statuses.map(function (status) {
			return (
				<option key={status} value={status}>{status}</option>
			);
		});
		return (
			<div className="form-group">
				<label htmlFor="status">New Services Status</label>
				<select className="form-control" id="status" name="serviceStatusId" ref="status"
						onChange={this.handleChange} defaultValue={this.props.initialValue}>
					{statusNodes}
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