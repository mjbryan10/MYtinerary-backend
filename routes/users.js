const express = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const key = require("../config.js").secretOrKey;
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

const router = express.Router();

router.get("/all", (req, res) => {
	userModel
		.find({})
		.then(files => {
			res.send(files);
		})
		.catch(err => console.error(err));
});

router.get("/:user", (req, res) => {
	let userId = req.params.user;
	userModel
		.findOne({ _id: userId })
		.then(user => {
			res.send(user);
		})
		.catch(err => console.error(err));
});

router.get("/test", (req, res) => {
	res.send({ msg: "user test route." });
});

const { check, validationResult } = require("express-validator");
router.post(
	"/create",
	[
		// username must be an email
		check("email").isEmail(),
		// password must be at least 5 chars long
		check("password")
			.isLength({ min: 5 })
			.withMessage("Minimum of 5 characters"),
	],
	(req, res) => {
		userModel.find({ email: req.body.email }).then(results => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}
			if (!results.length) {
				bcrypt.hash(req.body.password, 10, function(err, hash) {
					if (err) {
						throw err;
					} else {
						// Store hash in DB.
						const newUser = new userModel({
							email: req.body.email,
							password: hash,
						});
						newUser
							.save()
							.then(user => {
								res.send(user);
							})
							.catch(err => console.error(err));
					}
				});
			} else {
				res.send({ duplicate: true, msg: "This email is already in use" });
				console.error("User submitted duplicate email");
			}
		});
	}
);

router.post("/login", (req, res) => {
	userModel
		.findOne({ email: req.body.email })
		.then(user => {
			if (user) {
				bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
					if (err) throw err;
					if (isMatch) {
						const payload = {
							id: user._id,
							username: user.name,
							// avatarPicture: user.avatarPicture, //TODO
						};
						const options = { expiresIn: 2592000 };
						// const options = { expiresIn: 30000 };
						jwt.sign(payload, key, options, (err, token) => {
							if (err) {
								res.json({
									success: false,
									token: "There was an error",
								});
							} else {
								res.json({
									success: true,
									token: token,
								});
							}
						});
					} else {
						res.send({ success: false, msg: "Incorrect login details" });
					}
				});
			} else {
				res.send({ success: false, msg: "Incorrect login details" });
			}
		})
		.catch(err => {
			res.errors = err;
			console.error(err);
		});
	// res.send(result)
});

router.post("/user", (req, res) => {
	let decoded = {};
	if (req.body.token) {
		let token = req.body.token;
		decoded = jwtDecode(token);

		// console.log("TCL: decoded", decoded);
		//TODO: check if user is logged in

		// console.log(decoded);
		// console.log("Date now", Date.now())
		if (decoded.exp >= Date.now()) {
			res.send({ expired: true, msg: "Your session has expired, please log in again." });
		}
		userModel.findOne({ _id: decoded.id }).then(user => {
			res.send({ name: user.name || user.email, img: user.img || "" });
		});
	} else {
		res.send({ error: true, msg: "Token was not valid" });
	}
});

module.exports = router;


// res.send({ testisworking: req.body.test})