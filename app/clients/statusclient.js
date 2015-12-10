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
		return this._doGet("/api/services");
	}

	createService(service) {
		return this._doPost("/api/services", service);
	}

	getService(serviceId) {
		return this._doGet("/api/services/" + serviceId);
	}

	getIncidents() {
		return this._doGet("/api/incidents");
	}

	getIncidentsByType(type) {
		return this._doGet("/api/incidents?type=" + type);
	}

	getActiveIncidents() {
		return this._doGet("/api/incidents/active");
	}

	getActiveIncidentsByType(type) {
		return this._doGet("/api/incidents/active?type=" + type);
	}

	getIncident(incidentId) {
		return this._doGet("/api/incidents/" + incidentId);
	}

	createIncident(incident) {
		return this._doPost("/api/incidents", incident);
	}

	updateIncident(incidentId, update) {
		return this._doPost("/api/incidents/" + incidentId, update);
	}

	_doGet(path) {
		return axios.get(this.baseUrl + path, {
			headers: {Authorization: this._getAuthHeaderVal()},
			withCredentials: true
		});
	}

	_doPost(path, payload) {
		return axios.post(this.baseUrl + path, payload, {
			headers: {Authorization: this._getAuthHeaderVal()},
			withCredentials: true
		});
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
