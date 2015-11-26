import auth from "./auth";
import history from "./history";
import SC from "./clients/statusclient";

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



export var StatusClient = new SC(
	myBaseUrl, error => {
		if (error.status = 401) {
			auth.logout();
			history.replaceState(null, '/login');
		}
	});
