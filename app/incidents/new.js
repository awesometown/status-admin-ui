import React from "react";
import { Link } from "react-router";
import {PageHeader, Grid, Col, Row, Table} from "react-bootstrap"
import SERVICES from "../data/services"

export default React.createClass({
	render: function () {
		return (
			<div id="content">
				<PageHeader>New Incident</PageHeader>
				<NewIncidentForm services={SERVICES.data}/>
			</div>
		);
	}
});

var NewIncidentForm = React.createClass({
	render: function () {
		return (
			<form id="new-incident-form" role="form">
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input type="text" className="form-control" name="title" id="title"/>
				</div>
				<div className="form-group">
					<label htmlFor="description">Text for initial update</label>
					<textarea className="form-control" name="description" id="description"></textarea>
				</div>

				<StateSelector/>
				<AffectedServicesSelector services={this.props.services}/>
				<StatusSelector/>
				<button type="submit" value="Create" name="Create" id="submit" className="btn btn-default">Create
				</button>
			</form>
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

var AffectedServicesSelector = React.createClass({
	render: function () {
		var serviceNodes = this.props.services.map(service =>
			<div className="checkbox-inline" key={service.id}>
				<label><input type="checkbox" className="service-checkbox" id="service_{service.id}"
							  value="{service.id}"/>{service.name}</label>
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
