import React from "react";
import { Link } from "react-router";
import {Jumbotron, Grid, Col, Row, Table} from "react-bootstrap"


export default React.createClass({
	render: function () {
		return (
			<p>Hi there</p>
		);
	}
});

var SERVICES = {
	"data": [
		{
			"id": "034db69f-9a6e-48be-b154-ded387ca1b2e",
			"name": "asdf",
			"description": "asdf",
			"serviceStatus": {
				"id": "ok",
				"name": "Operational",
				"displayColor": "2FCC66"
			},
			"createdAt": "2015-10-24T22:08:43.703Z",
			"updatedAt": "2015-10-24T22:08:43.703Z"
		}
	]
}
