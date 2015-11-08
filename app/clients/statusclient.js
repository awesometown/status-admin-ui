import axios from "axios";

export default class StatusClient {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	getServices() {
		return axios.get(this.baseUrl + "/api/services");
	}

	getIncidents() {
		return axios.get(this.baseUrl + "/api/incidents");
	}

	getIncident(incidentId) {
		return axios.get(this.baseUrl + "/api/incidents/" + incidentId);
	}

	createIncident(incident) {
		return axios.post("http://localhost:9000/api/incidents", incident);
	}

	updateIncident(incidentId, update) {
		return axios.post("http://localhost:9000/api/incidents/" + incidentId, update);
	}
}
