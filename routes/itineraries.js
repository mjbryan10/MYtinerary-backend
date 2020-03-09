const express = require("express");
const itineraryModel = require("../model/itineraryModel");

const router = express.Router();

router.get("/all", (req, res) => {
	//fetches all itins
	itineraryModel
		.find({})
		.then(files => {
			res.send(files);
		})
		.catch(err => console.error(err));
});

router.get("/city/:cityId", (req, res) => {
	//fetches all itins for specific city.
	let cityRequested = req.params.cityId;
	itineraryModel
		.find({ city_id: cityRequested })
		.then(itineraries => {
			res.send(itineraries);
		})
		.catch(err => console.error(err));
});

router.get("/itinerary/:id", (req, res) => {
	let id = req.params.id;
	if (!id) {
		return res.status(400).send({success: false, msg: "No ID was provided"})
	}
	itineraryModel
		.findOne({ _id: id})
		.then(itinerary => {	
			res.status(200).send({success: true, itinerary})
		})
		.catch(err => console.error(err));
})

router.get("/test", (req, res) => {
	res.send({ msg: "itinerary test route." });
});
module.exports = router;