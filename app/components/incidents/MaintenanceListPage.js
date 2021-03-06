import React from "react";

import { statusClient } from "../../globals";

import { PageHeader, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import IncidentList from "./IncidentList.js"

export default React.createClass({

	getInitialState: function () {
		return {
			incidents: [],
			services: [],
			loaded: false
		};
	},

	componentDidMount: function () {

		let incidentsPromise = statusClient.getActiveIncidentsByType("planned").then(result => {

			if (this.isMounted()) {
				this.setState({ incidents: result.data.data });
				console.log(result);
			}

		})
			.catch(result => console.error(result));

		let servicesPromise = statusClient.getServices().then(result => {

			if (this.isMounted()) {

				let servicesMap = {};
				for (let service of result.data.data) {
					servicesMap[service.id] = service.name;
				}
				this.setState({ servicesMap: servicesMap });

			}

		})
			.catch(result => console.error(result));

		Promise.all([incidentsPromise, servicesPromise]).then(values => this.setState({ loaded: true }));

	},

	render: function () {

		let content;
		if (this.state.loaded) {
			content = <IncidentList incidents={ this.state.incidents } servicesMap={ this.state.servicesMap }/>
		} else {
			content = null;
		}

		return (
			<div id="content">
				<LinkContainer to="/admin/maintenance/new"><Button className="button">New Maintenance</Button></LinkContainer>
				<PageHeader>Maintenance</PageHeader>
				{ content }
			</div>
		);

	}

});