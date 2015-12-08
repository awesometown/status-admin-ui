import React from "react";

export default React.createClass({

	propTypes: {
		incidentUpdates: React.PropTypes.array.isRequired
	},

	getDefaultProps: function() {
		return {
			incidentUpdates: []
		};
	},

	componentDidMount: function () { },

	render: function () {

		var updateNodes = this.props.incidentUpdates.map(update =>
			<li key={ update.id }>
				{ update.description }
			</li>
		);

		return (
			<ul>
				{ updateNodes }
			</ul>
		);
	}

});