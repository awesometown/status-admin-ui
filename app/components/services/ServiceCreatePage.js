import React from "react";
import { History, Link } from "react-router";
import {PageHeader, Grid, Col, Row, Table} from "react-bootstrap"
import { statusClient } from "../../globals";

export default React.createClass({
	mixins: [History],

	handleClick: function(e) {
		e.preventDefault();
		var name = this.refs.name.value.trim();
		var description = this.refs.description.value.trim();
		statusClient.createService({
			name: name,
			description: description
		}).then(response => {
			console.log(response);
			var location = response.headers["location"];
			var id = location.substring(location.lastIndexOf('/') + 1);
			this.history.replaceState(null, "/admin/services/" + id);
		}).catch(response => {
			console.log(response);
		})
	},

	render: function () {
		return (
			<div id="new-service">
				<PageHeader>Create a new Service</PageHeader>
				<form id="new-service-form" role="form">
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input type="text" className="form-control" name="name" id="name" ref="name"/>
					</div>
					<div className="form-group">
						<label htmlFor="description">Description</label>
						<textarea className="form-control" name="description" id="description" ref="description"></textarea>
					</div>
					<button type="submit" value="Create" name="Create" id="submit" className="btn btn-default" onClick={this.handleClick}>Create</button>
				</form>
			</div>
		);
	}
});