import React from "react";
import { Link } from "react-router";
import { Grid, Col, Row} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { statusClient } from "../../globals";

export default React.createClass({

	propTypes: {
		services: React.PropTypes.array.isRequired,
	},

	render: function () {
		var serviceNodes = this.props.services.map(service =>
			<Row key={service.id}>
				<Col md={4}><Link to={"/services/" + service.id}>{service.name}</Link></Col>
				<Col md={4}>{service.serviceStatus}</Col>
			</Row>
		);
		return (
			<Grid fluid>
				{serviceNodes}
			</Grid>
		);
	}
});