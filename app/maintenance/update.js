import React from "react";

import { statusClient } from "../globals";

import Form from "../components/incidents/form.js";

export default React.createClass({

	getInitialState: function () {
		return {
			loaded: false
		};
	},

	componentDidMount: function () {

		let incidentId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);

		let incidentsPromise = statusClient.getIncident(incidentId)
			.then(result => {
				if (this.isMounted()) {
					this.setState({incident: result.data});
					console.log(result);
				}
			})
			.catch(result => console.error(result));

		Promise.all([incidentsPromise]).then(values => this.setState({loaded: true}));

	},

	render: function () {

		var content;

		if(!this.state.loaded) {
			content = (<div>Loading...</div>);
		} else {
			content = (
				<Form type="planned" incident={this.state.incident}/>
			);
		}

		return content;

	}

});