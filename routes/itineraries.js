const express = require("express");
const itineraryModel = require("../model/itineraryModel");

const router = express.Router();

router.get("/all", (req, res) => {
	itineraryModel
		.find({})
		.then(files => {
			res.send(files);
		})
		.catch(err => console.error(err));
});

router.get("/search", (req, res) => {
	var query = {};
	if (req.body.city_id) {
		query.city_id = req.body.city_id;
	}
	itineraryModel
		.find(query)
		.then(files => {
			res.send(files);
		})
		.catch(err => console.error(err));
});

router.get("/test", (req, res) => {
	res.send({ msg: "itinerary test route." });
});
module.exports = router;
