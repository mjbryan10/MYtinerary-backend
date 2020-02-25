import { Router } from "express";
import cityModel, { find, findOne, findOneAndDelete } from "../model/cityModel";

const router = Router();

router.get("/all", (req, res) => {
	find({})
		.then(files => {
			res.send(files);
		})
		.catch(err => console.error(err));
});

router.get("/:name", ((req, res) => {
	let cityRequested = req.params.name
	findOne({name: cityRequested})
		.then(city => {
			res.send(city);
		})
		.catch(err => console.error(err));
}))

router.post("/", (req, res) => {
	find({ name: req.body.name, country: req.body.country }).then(results => {
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
	findOneAndDelete({ name: req.body.name, country: req.body.country }, err => {
		if (err) return res.send(500, err);
		res.send(`${req.body.name} ${req.body.country} has been deleted`);
	});
});

router.get("/test", (req, res) => {
	res.send({ msg: "Cities test route." });
});
export default router;
