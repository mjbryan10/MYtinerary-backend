import { Router } from "express";
import { find } from "../model/itineraryModel";

const router = Router();

router.get("/all", (req, res) => {
	find({})
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
export default router;
