import axios from "axios";

export default class StatusClient {
	constructor(baseUrl, userId, password, authFailHandler) {
		this.baseUrl = baseUrl;
		this.userId = userId;
		this.password = password;
		axios.interceptors.response.use(
				response => response,
				authFailHandler);
	}

	setCredentials(userId, password) {
		this.userId = userId;
		this.password = password;
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
		return "Basic " + btoa(this._getUsername() + ":" + this._getPassword());
	}

	_getUsername() {
		return this.userId;
	}

	_getPassword() {
		return this.password;
	}
}
