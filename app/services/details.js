import React from "react";
import { Link } from "react-router";
import {PageHeader, Grid, Col, Row, Table} from "react-bootstrap";
import SERVICES from "../data/services";
import axios from "axios";

export default React.createClass({

	getInitialState: function() {
		return {
			service: {
				name: "",
				description: "",
				serviceStatusId: ""
			}
		};
	},

	componentDidMount: function() {
		var location = window.location.href;
		var id = location.substring(location.lastIndexOf('/') + 1);

		axios.get("http://localhost:9000/api/services/" + id)
			.then(result => {
				this.setState({service: result.data });
				console.log(result);
			})
			.catch(result => console.log(result));
	},

	render: function () {
		var service = this.state.service;

		return (
			<div id="content">
				<PageHeader>{service.name}</PageHeader>
				<p>{service.description}</p>
				<p>{service.serviceStatusId}</p>
			</div>
		);
	}
});