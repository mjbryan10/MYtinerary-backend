const express = require("express");
const cityModel = require("../model/cityModel");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
require('dotenv').config();
const secret = process.env.TOKEN_KEY;

const router = express.Router();

router.get("/all", (req, res) => {
	let token = req.headers["x-api-key"];
	if (!token) {
		return res.status(401).send({ error: "No token provided" });
	}
	// let token = jwt.verify(req.body.token, secret);

	try {
		jwt.verify(token, secret);
	} catch (err) {
		// err
		return res.status(403).send({ error: "invalid token" });
	}
	let decoded = jwtDecode(token);

	if (decoded.exp < Date.now()) {
		cityModel
			.find({})
			.then(files => {
				res.send(files);
			})
			.catch(err => console.error(err));
	} else {
		// res.redirect("/login") //return response, front to reroute
		res.send({ error: "Token has expired" });
	}
});

router.get("/top", (req, res) => {
	cityModel
		.find({})
		.sort({ _id: 1 })
		.limit(12)
		.then(cities => {
			res.send(cities);
		})
		.catch(err => console.error(err));
});

router.get("/:name", (req, res) => {
	let cityRequested = req.params.name;
	cityModel
		.findOne({ name: cityRequested })
		.then(city => {
			//TODO: Make this more stable
			if (city) {
				res.send(city);
			} else {
				res.send({ error: "No city found" });
			}
		})
		.catch(err => console.error(err));
});

router.post("/", (req, res) => {
	cityModel.find({ name: req.body.name, country: req.body.country }).then(results => {
		if (!results.length) {
			const newCity = new cityModel({
				name: req.body.name,
				country: req.body.country,
			});
			newCity
				.save()
				.then(city => {
					res.send(city);
				})
				.catch(err => console.error(err));
		} else {
			res.send(
				`An entry with the name: ${req.body.name} and country: ${req.body.country} already exists`
			);
			console.error("This city already exists");
		}
	});
});

router.delete("/", (req, res) => {
	cityModel.findOneAndDelete({ name: req.body.name, country: req.body.country }, err => {
		if (err) return res.send(500, err);
		res.send(`${req.body.name} ${req.body.country} has been deleted`);
	});
});

router.get("/test", (req, res) => {
	res.send({ msg: "Cities test route." });
});
module.exports = router;
