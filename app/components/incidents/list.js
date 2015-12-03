import React from "react";

import { Row, Col } from "react-bootstrap";

import Incident from "./detail.js"

export default React.createClass({

	propTypes: {
		incidents: React.PropTypes.array.isRequired,
		servicesMap: React.PropTypes.object.isRequired
	},

	getDefaultProps: function() {
		return {
			incidents: [],
			servicesMap: {}
		};
	},

	componentDidMount: function () { },

	render: function () {

		console.log("Incidents: %O", this.props.incidents);
		console.log("Services: %O", this.props.servicesMap);

		let incidentNodes = this.props.incidents.map(incident =>
			<Incident key={ incident.id } incident={ incident } servicesMap={ this.props.servicesMap }/>);

		return (
			<Row>
				<Col mdOffset={1} md={10}>
					{ incidentNodes }
				</Col>
			</Row>
		);

	}

});