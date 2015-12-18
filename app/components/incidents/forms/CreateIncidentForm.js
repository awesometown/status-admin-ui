import React from "react";

import { PageHeader } from "react-bootstrap";

import { History } from "react-router";
import { statusClient } from "../../../globals";

export default React.createClass({

	mixins: [History],

	propTypes: {
		type: React.PropTypes.string.isRequired
	},

	getInitialState: function () {
		return {
			services: []
		};
	},

	componentDidMount: function () {
		statusClient.getServices()
			.then(result => {
				console.log(result);
				if (this.isMounted()) {
					this.setState({ services: result.data.data });
				}
			})
			.catch(result => console.error(result));
	},

	handleSubmit: function (update) {

		statusClient.createIncident(update)
			.then(response => {

				console.log(response);

				let urlPath = this.props.type === 'planned' ? '/admin/maintenance/' : '/admin/incidents/';

				var location = response.headers["location"];
				var id = location.substring(location.lastIndexOf('/') + 1);
				this.history.replaceState(null, urlPath + id);

			}).catch(response => {
				console.error(response);
			});

	},

	render: function () {

		let pageHeader = this.props.type === 'planned' ? "New Maintenance" : "New Incident";

		return (
			<div id="content">
				<PageHeader>{ pageHeader }</PageHeader>
				<IncidentForm services={ this.state.services } type={ this.props.type }
							  incident={ this.state.incident } onSubmit={ this.handleSubmit }/>
			</div>
		);

	}
});

var IncidentForm = React.createClass({

	propTypes: {
		type: React.PropTypes.string.isRequired,
		services: React.PropTypes.array.isRequired,
		onSubmit: React.PropTypes.func.isRequired
	},

	getInitialState: function () {

		let state = "investigating";
		let serviceStatusId = "degraded";

		if(this.props.type === 'planned') {
			state = "pending";
			serviceStatusId = "ok";
		}

		return {
			title: '',
			state: state,
			serviceStatusId: serviceStatusId,
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
			"type": this.props.type,
			"description": this.state.description,
			"affectedServiceIds": this.state.affectedServiceIds
		};
		this.props.onSubmit(update);
	},

	handleStateChange: function (incidentState) {
		this.setState({ state: incidentState });
	},

	handleTitleChange: function (event) {
		this.setState({ title: event.target.value });
	},

	handleDescriptionChange: function (event) {
		this.setState({ description: event.target.value });
	},

	handleStatusChange: function (status) {
		console.log("Setting status state to %s", status);
		this.setState({ serviceStatusId: status });
	},

	handleServicesChange: function (serviceIds) {
		this.setState({ affectedServiceIds: serviceIds });
	},

	render: function () {

		let descriptionTitle = "Text for Initial Update";
		let buttonTitle = "Create";

		return (
			<form id="new-incident-form" role="form">
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input type="text" className="form-control" name="title" id="title" ref="title" value={this.state.title}
						   onChange={ this.handleTitleChange }/>
				</div>
				<div className="form-group">
					<label htmlFor="description">{ descriptionTitle }</label>
					<textarea className="form-control" name="description" id="description" ref="description"
							  onChange={ this.handleDescriptionChange }>
					</textarea>
				</div>

				<StateSelector onChange={ this.handleStateChange } type={ this.props.type } defaultValue={ this.state.state }/>
				<AffectedServicesSelector services={ this.props.services } onChange={ this.handleServicesChange } defaultValue={ this.state.affectedServiceIds } />
				<StatusSelector onChange={ this.handleStatusChange } type={ this.props.type } defaultValue={ this.state.serviceStatusId } incident={ this.state.incident }/>

				<button type="submit" value="Create" name="Create" id="submit" className="btn btn-default"
						onClick={ this.handleClick }>
					{ buttonTitle }
				</button>

			</form>
		);

	}
});

var StateSelector = React.createClass({

	propTypes: {
		defaultValue: React.PropTypes.string.isRequired,
		type: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired
	},

	handleChange: function () {
		this.props.onChange(this.refs.state.value.trim());
	},

	render: function () {

		var states = ['investigating', 'identified', 'monitoring', 'resolved'];

		if (this.props.type === 'planned') {
			states = ['pending', 'started', 'completed'];
		}

		var stateNodes = states.map(function (state) {
			return (
				<option key={ state } value={ state }>{ state }</option>
			);
		});

		return (
			<div className="form-group">
				<label htmlFor="state">State</label>
				<select className="form-control" id="state" name="state" ref="state"
						defaultValue={ this.props.defaultValue } onChange={ this.handleChange }>
					{ stateNodes }
				</select>
			</div>);
	}

});

var AffectedServicesSelector = React.createClass({

	propTypes: {
		defaultValue: React.PropTypes.array.isRequired,
		services: React.PropTypes.array.isRequired,
		onChange: React.PropTypes.func.isRequired
	},

	getInitialState: function () {
		return {
			serviceIds: []
		};
	},

	handleSelection: function (event) {

		var serviceIds = new Set(this.state.serviceIds);

		if (event.target.checked) {
			serviceIds.add(event.target.value);
		} else {
			serviceIds.delete(event.target.value);
		}

		let serviceIdsArray = Array.from(serviceIds);
		this.setState({ serviceIds: serviceIdsArray });
		this.props.onChange(serviceIdsArray);

		console.log(serviceIds);

	},

	render: function () {

		console.log(this.props.defaultValue);

		var serviceNodes = this.props.services.map(service => {

			return (
				<div className="checkbox-inline" key={service.id}>
					<label>
						<input type="checkbox" ref={ "service_" + service.id } className="service-checkbox"
							   defaultChecked={ this.props.defaultValue.indexOf(service.id) > -1 }
							   id={ "service_" + service.id } value={ service.id } onChange={ this.handleSelection }/>
						{ service.name }
					</label>
				</div>
			);
		});

		return (
			<div className="form-group">
				<label htmlFor="services">Affected Services</label>
				<div className="panel panel-default service-checkbox-list">
					{ serviceNodes }
				</div>
			</div>
		);

	}
});

var StatusSelector = React.createClass({

	propTypes: {
		defaultValue: React.PropTypes.string.isRequired,
		type: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired
	},

	handleChange: function () {
		this.props.onChange(this.refs.status.value.trim());
	},

	render: function () {

		var statuses = ['ok', 'degraded', 'minor', 'major'];

		if (this.props.type === 'planned') {
			statuses = ['ok', 'maintenance'];
		}

		var statusNodes = statuses.map(function (status) {

			return (
				<option key={ status } value={ status }>{ status }</option>
			);

		});

		let labelText = "Status for Affected Services";

		return (
			<div className="form-group">
				<label htmlFor="status">{ labelText }</label>
				<select className="form-control" id="status" name="serviceStatusId" ref="status" defaultValue={ this.props.defaultValue }
						onChange={ this.handleChange }>
					{ statusNodes }
				</select>
			</div>
		);

	}
});
