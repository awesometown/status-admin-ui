import { createHistory, useBasename } from 'history'
import Auth from "./auth";
import SC from "./clients/statusclient";

String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

var myBaseUrl;
if (typeof baseUrl !== 'undefined') {
	myBaseUrl = baseUrl;
	console.log("baseUrl defined: " + myBaseUrl);
} else {
	myBaseUrl = window.location.protocol + "//" + window.location.hostname;
	if (window.location.port) {
		myBaseUrl = myBaseUrl + ":" + window.location.port;
	}
	console.log("baseUrl not specified, using " + myBaseUrl);
}

export var history = createHistory();

export var auth = new Auth(myBaseUrl);

export var statusClient = new SC(
	myBaseUrl,
	localStorage.userId,
	localStorage.password,
		error => {
		if (error.status = 401) {
			auth.logout();
			history.replaceState(null, '/login');
		}
	});
