import React from "react";

import { PageHeader, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default React.createClass({

	componentDidMount: function () { },

	render: function () {

		return (
			<div id="content">
				<LinkContainer to="/maintenance/new"><Button className="button">New Maintenance</Button></LinkContainer>
				<PageHeader>Maintenance</PageHeader>
			</div>
		);

	}

});