import React from "react";
import { History } from "react-router";
import { Grid, Row, Col, Panel, Button } from "react-bootstrap";
import { auth, statusClient } from "../globals";

export default React.createClass({
	mixins: [History],

	getInitialState() {
		return {
			error: false
		}
	},

	handleSubmit(event) {
		event.preventDefault()

		const email = this.refs.email.value
		const pass = this.refs.pass.value

		auth.login(email, pass, (loggedIn) => {
			if (!loggedIn) {
				return this.setState({error: true});
			}
			statusClient.setCredentials(email, pass);
			const { location } = this.props;

			if (location.state && location.state.nextPathname) {
				this.history.replaceState(null, location.state.nextPathname)
			} else {
				this.history.replaceState(null, '/')
			}
		})
	},

	render() {
		return (
			<Grid>
				<Row>
					<Col mdOffset={4} md={4}>
						<Panel className="text-center">
							<form onSubmit={this.handleSubmit} role="form">
								<div className="form-group">
									<label><input className="form-control text-center" ref="email" placeholder="email"/></label>
								</div>
								<div className="form-group">
									<label><input ref="pass" type="password" className="form-control text-center" placeholder="password"/></label>
								</div>
								<Button bsStyle="success" onClick={this.handleSubmit}>Login</Button>
								{this.state.error && (
									<p>Bad login information</p>
								)}
							</form>
						</Panel>
					</Col>
				</Row>
			</Grid>
		)
	}
})