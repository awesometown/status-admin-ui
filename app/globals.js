import { createHistory, useBasename } from 'history'
import Auth from "./auth";
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

/* bit of a hack to make react router work both when run at "/" in webpack-dev-server as well as /admin when deployed */
var historyRoot = "";
if (window.location.pathname.indexOf("/admin") >= 0) {
	historyRoot = "/admin";
}

export var history = useBasename(createHistory)({
	basename: historyRoot
});

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
