const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
require('dotenv').config();
const secret = process.env.TOKEN_KEY;

function isTokenValid(token) {
	if (!token) {
		return false;
	}
	try {
		jwt.verify(token, secret);
	} catch (err) {
		// err
		return false;
	}
	let decoded = jwtDecode(token);

	if (decoded.exp >= Date.now()) {
		return false;
	} else {
		return decoded;
	}
}

module.exports = isTokenValid;
