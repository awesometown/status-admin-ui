module.exports = {
	login(userId, password, cb) {
		cb = arguments[arguments.length - 1];
		if (localStorage.userId) {
			if (cb) cb(true);
			this.onChange(true);
			return;
		}
		localStorage.userId = userId;
		localStorage.password = password;
		//pretendRequest(email, pass, (res) => {
		//	if (res.authenticated) {
		//		localStorage.token = res.token;
		//		if (cb) cb(true);
		//		this.onChange(true)
		//	} else {
		//		if (cb) cb(false);
		//		this.onChange(false);
		//	}
		//})
	},

	getUserId() {
		return localStorage.userId;
	},

	getPassword() {
		return localStorage.password;
	},

	logout(cb) {
		delete localStorage.userId;
		delete localStorage.password;
		if (cb) cb();
		this.onChange(false);
	},

	loggedIn() {
		return !!localStorage.userId;
	},

	onChange() {
	}
}

function pretendRequest(email, pass, cb) {
	setTimeout(() => {
		if (email === 'joe@example.com' && pass === 'password1') {
			cb({
				authenticated: true,
				token: Math.random().toString(36).substring(7)
			})
		} else {
			cb({authenticated: false})
		}
	}, 0)
}