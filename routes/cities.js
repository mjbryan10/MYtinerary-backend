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

router.get("/test", (req, res) => {
	res.send({ msg: "Cities test route." });
});
module.exports = router;
