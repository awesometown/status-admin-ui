import axios from "axios";

export default class StatusClient {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	getServices() {
		return axios.get(this.baseUrl + "/api/services");
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
}
