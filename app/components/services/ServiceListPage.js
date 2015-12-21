import React from "react";
import { Link } from "react-router";
import {PageHeader, Button, Grid, Col, Row, Table} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ServiceList from "./ServiceList";
import { statusClient } from "../../globals";

export default React.createClass({

	getInitialState: function () {
		return {
			services: []
		};
	},

	componentDidMount: function () {
		statusClient.getServices()
			.then(result => {
				if (this.isMounted()) {
					this.setState({services: result.data.data});
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

		return (
			<div id="services-list">
				<LinkContainer to="/admin/services/new"><Button style={buttonStyle}>New Service</Button></LinkContainer>
				<PageHeader>Services</PageHeader>
				<ServiceList services={this.state.services}/>
			</div>
		);
	}
});