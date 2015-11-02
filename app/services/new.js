import React from "react";
import { Link } from "react-router";
import {PageHeader, Grid, Col, Row, Table} from "react-bootstrap"

export default React.createClass({
	render: function () {
		return (
			<div id="new-service">
				<PageHeader>Create a new Service</PageHeader>
				<form id="new-service-form" role="form">
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input type="text" className="form-control" name="name" id="name"/>
					</div>
					<div className="form-group">
						<label htmlFor="description">Description</label>
						<textarea className="form-control" name="description" id="description"></textarea>
					</div>
					<button type="submit" value="Create" name="Create" id="submit" className="btn btn-default">Create</button>
				</form>
			</div>
		);
	}
});