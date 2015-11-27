import axios from "axios";

export default class Auth {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	login(userId, password, cb) {
		cb = arguments[arguments.length - 1];
		if (localStorage.userId) {
			if (cb) cb(true);
			this.onChange(true);
			return;
		}


		this._validateCredentials(userId, password,
			(isValid) =>
		{
			if (isValid) {
				localStorage.userId = userId;
				localStorage.password = password;
			}
			if (cb) cb(isValid);
		});
	}

	getUserId() {
		return localStorage.userId;
	}

	getPassword() {
		return localStorage.password;
	}

	logout(cb) {
		delete localStorage.userId;
		delete localStorage.password;
		if (cb) cb();
		this.onChange(false);
	}

	loggedIn() {
		return !!localStorage.userId;
	}

	onChange() {
	}

	_validateCredentials(username, pass, cb) {
		//Create a separate instance so that we're not subject to any settings StatusClient might have set up.
		var instance = axios.create();

		//Lacking an explicit "validate" endpoint, try getting a list of services and see what happens
		instance.get(
			this.baseUrl + "/api/services",
			{
				headers: {Authorization: this._getAuthHeaderVal(username, pass)},
				withCredentials: true
			})
			.then(response => {
				if (cb) cb(true)
			})
			.catch(response => {
				console.log("Error validating credentials");
				console.log(response);
				if (cb) cb(false);
			});
	}

	_getAuthHeaderVal(username, password) {
		return "Basic " + btoa(username + ":" + password);
	}
}