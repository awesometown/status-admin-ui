import React from "react";
import { History, Link } from "react-router";
import {PageHeader, Grid, Col, Row, Table} from "react-bootstrap";
import { statusClient } from "../globals";

export default React.createClass({
	mixins: [History],

	getInitialState: function () {
		return {services: []};
	},

	componentDidMount: function () {
		statusClient.getServices()
			.then(result => {
				console.log(result);
				if (this.isMounted()) {
					this.setState({services: result.data.data});
				}
			})
			.catch(result => console.log(result));
	},

	handleSubmit: function (update) {

		statusClient.createIncident(update)
			.then(response => {
				console.log(response);
				var location = response.headers["location"];
				var id = location.substring(location.lastIndexOf('/') + 1);
				this.history.replaceState(null, "/incidents/" + id);
			}).catch(response => {
				console.log(response);
			});
	},

	render: function () {
		return (
			<div id="content">
				<PageHeader>New Incident</PageHeader>
				<NewIncidentForm services={this.state.services} onSubmit={this.handleSubmit}/>
			</div>
		);
	}
});

var NewIncidentForm = React.createClass({

	getInitialState: function () {
		return {
			title: '',
			state: 'investigating',
			serviceStatusId: 'degraded',
			description: '',
			affectedServiceIds: []
		};
	},

	handleClick: function (e) {
		e.preventDefault();
		var update = {
			"title": this.state.title,
			"serviceStatusId": this.state.serviceStatusId,
			"state": this.state.state,
			"description": this.state.description,
			"affectedServiceIds": this.state.affectedServiceIds
		};
		this.props.onSubmit(update);
	},

	handleStateChange: function (incidentState) {
		this.setState({state: incidentState});
	},

	handleTitleChange: function (event) {
		this.setState({title: event.target.value});
	},

	handleDescriptionChange: function (event) {
		this.setState({description: event.target.value});
	},

	handleStatusChange: function (status) {
		this.setState({serviceStatusId: status});
	},

	handleServicesChange: function (serviceIds) {
		this.setState({affectedServiceIds: serviceIds});
	},

	render: function () {
		return (
			<form id="new-incident-form" role="form">
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input type="text" className="form-control" name="title" id="title" ref="title"
						   onChange={this.handleTitleChange}/>
				</div>
				<div className="form-group">
					<label htmlFor="description">Text for initial update</label>
					<textarea className="form-control" name="description" id="description" ref="description"
							  onChange={this.handleDescriptionChange}></textarea>
				</div>

				<StateSelector onChange={this.handleStateChange} defaultValue={this.state.state}/>
				<AffectedServicesSelector services={this.props.services} onChange={this.handleServicesChange}/>
				<StatusSelector onChange={this.handleStatusChange} defaultValue={this.state.serviceStatusId}/>
				<button type="submit" value="Create" name="Create" id="submit" className="btn btn-default"
						onClick={this.handleClick}>Create
				</button>
			</form>
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
						defaultValue={this.props.defaultValue} onChange={this.handleChange}>
					{stateNodes}
				</select>
			</div>);
	}
});

var AffectedServicesSelector = React.createClass({
	getInitialState: function () {
		return {serviceIds: []};
	},

	handleSelection: function (event) {
		var serviceIds = new Set(this.state.serviceIds);
		if (event.target.checked) {
			serviceIds.add(event.target.value);
		} else {
			serviceIds.delete(event.target.value);
		}
		let serviceIdsArray = Array.from(serviceIds);
		this.setState({serviceIds: serviceIdsArray});
		this.props.onChange(serviceIdsArray);
		console.log(serviceIds);
	},

	render: function () {
		var serviceNodes = this.props.services.map(service =>
			<div className="checkbox-inline" key={service.id}>
				<label><input type="checkbox" ref={"service_" + service.id} className="service-checkbox"
							  id={"service_" + service.id}
							  value={service.id} onChange={this.handleSelection}/>{service.name}</label>
			</div>);
		return (
			<div className="form-group">
				<label htmlFor="services">Affected Services</label>

				<div className="panel panel-default service-checkbox-list">
					{serviceNodes}
				</div>
			</div>
		);
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
						onChange={this.handleChange} defaultValue={this.props.defaultValue}>
					{statusNodes}
				</select>
			</div>
		);
	}
});
