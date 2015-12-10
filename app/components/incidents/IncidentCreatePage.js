import React from "react";

import CreateIncidentForm from "./forms/CreateIncidentForm.js";

export default React.createClass({

	componentDidMount: function () { },

	render: function () {
		return (
			<CreateIncidentForm type="unplanned" />
		);
	}

});