import React from "react";
import { Link } from "react-router";
import {Jumbotron, Grid, Col, Row, Table} from "react-bootstrap"


export default React.createClass({
	render: function () {
		return (
			<div className="container" role="main">
				<Jumbotron>
					<h1>Some kind of Dashboard Goes Here</h1>

					<p>Click the links on the side for more interesting things.</p>
				</Jumbotron>
			</div>
		);
	}
});