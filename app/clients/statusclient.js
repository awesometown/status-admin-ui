import axios from "axios";
import auth from "../auth";
import history from "../history";

export default class StatusClient {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
		axios.interceptors.response.use(
				response => response,
				error => {
				if (error.status = 401) {
					history.
				}
			});
	}

	getServices() {
		console.log("username: " + this._getUsername());
		return axios.get(this.baseUrl + "/api/services", {
			headers: {Authorization: this._getAuthHeaderVal()},
			withCredentials: true
		});
	}

	createService(service) {
		return axios.post(this.baseUrl + "/api/services", service);
	}

	getService(serviceId) {
		return axios.get(this.baseUrl + "/api/services/" + serviceId);
	}

	getIncidents() {
		return axios.get(this.baseUrl + "/api/incidents");
	}

	getActiveIncidents() {
		return axios.get(this.baseUrl + "/api/incidents/active");
	}

	getIncident(incidentId) {
		return axios.get(this.baseUrl + "/api/incidents/" + incidentId);
	}

	createIncident(incident) {
		return axios.post(this.baseUrl + "/api/incidents", incident);
	}

	updateIncident(incidentId, update) {
		return axios.post(this.baseUrl + "/api/incidents/" + incidentId, update);
	}

	_getAuthHeaderVal() {
		return "Basic " + btoa(auth.getUserId() + ":" + auth.getPassword());
	}

	_getUsername() {
		return auth.getUserId();
	}

	_getPassword() {
		return auth.getPassword();
	}
}
