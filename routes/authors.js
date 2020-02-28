const express = require("express");
const authorModel = require("../model/authorModel");

const router = express.Router();

router.get("/all", (req, res) => {
	authorModel
		.find({})
		.then(files => {
			res.send(files);
		})
		.catch(err => console.error(err));
});

router.get("/:author", (req, res) => {
	let authorId = req.params.author;
	authorModel
		.findOne({ _id: authorId })
		.then(author => {
			res.send(author);
		})
		.catch(err => console.error(err));
});

router.get("/test", (req, res) => {
	res.send({ msg: "author test route." });
});
module.exports = router;