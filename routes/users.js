const express = require("express");
const userModel = require("../model/userModel");

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
	"/",
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
				const newUser = new userModel({
					email: req.body.email,
					password: req.body.password,
				});
				newUser
					.save()
					.then(user => {
						res.send(user);
					})
					.catch(err => console.error(err));
			} else {
				res.send({duplicate: true, msg: "This email is already in use"});
				console.error("User submitted duplicate email");
			}
		});
	}
);

module.exports = router;
