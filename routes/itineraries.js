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

router.get("/:cityId", (req, res) => {
	let cityRequested = req.params.cityId;
	itineraryModel
		.find({ city_id: cityRequested })
		.then(itineraries => {
			res.send(itineraries);
		})
		.catch(err => console.error(err));
});

router.get("/test", (req, res) => {
	res.send({ msg: "itinerary test route." });
});
module.exports = router;