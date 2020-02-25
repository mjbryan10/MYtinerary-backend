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

router.get("/search", (req, res) => {
	var query = {};
	if (req.body.city_id) {
		query.city_id = req.body.city_id;
	}
	find(query)
		.then(files => {
			res.send(files);
		})
		.catch(err => console.error(err));
});

router.get("/test", (req, res) => {
	res.send({ msg: "itinerary test route." });
});
export default router;
