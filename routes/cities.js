const express = require("express");
const cityModel = require("../model/cityModel");

const router = express.Router();

router.get("/all", (req, res) => {
	cityModel
		.find({})
		.then(files => {
			res.send(files);
		})
		.catch(err => console.error(err));
});

// console.log(
// 	"TCL test",
// 	cityModel.find({ name: "Dubai" }).then(files => {
// 		console.log("TCL: files", files);
// 		res.send(files);
// 	})
// );

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
