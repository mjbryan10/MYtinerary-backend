const express = require("express");
const commentModel = require("../model/commentModel");
const isTokenValid = require("../global/tokenValidation");
const router = express.Router();

router.post("/post", (req, res) => {
	let token = isTokenValid(req.headers["x-api-key"]);
	if (token === false) {
		return res.status(403).send({ success: false, msg: "Invalid Token" });
	}
	if (!req.body.text || !req.body.itin || !req.body.author) {
		return res
			.status(400)
			.send({ success: false, msg: "Must include (itin) id, (author) and comment (text)" });
	}
	const newComment = new commentModel({
		itin_id: req.body.itin,
		posted: Date.now(),
		author: {
			id: token.id,
			name: req.body.author,
		},
		title: req.body.title || "",
		text: req.body.text,
		rating: req.body.rating,
	});
	newComment
		.save()
		.then(comment => {
			return res.send({
				success: true,
				msg: "Your comment has been successfully submitted",
				comment,
			});
		})
		.catch(err => console.error(err));
});

// router.get("/:itin/:page?", (req, res) => {
// 	if (!req.params.itin) {
// 		return res.status(400).send({ error: "Must include (itin)" });
// 	}
// 	let limit = req.params.page * 10 || 3;
// 	commentModel
// 		.find({ itin_id: req.params.itin })
// 		.sort({ posted: -1 })
// 		.limit(limit)
// 		.then(comments => {
// 			if (comments.length) {
// 				res.send({ success: true, comments });
// 			} else {
// 				res.send({ success: false, msg: "No comments found" });
// 			}
// 		});
// });

router.get("/:itin/:page?", async (req, res) => {
	if (!req.params.itin) {
		return res.status(400).send({ error: "Must include (itin)" });
	}
	let limit = req.params.page * 10 || 3;
	let count = await commentModel.countDocuments({ itin_id: req.params.itin });

	commentModel
		.find({ itin_id: req.params.itin })
		.sort({ posted: -1 })
		.limit(limit)
		.then(comments => {
			if (comments.length) {
				res.send({ success: true, comments, count });
			} else {
				res.send({ success: false, msg: "No comments found" });
			}
		});
});





router.delete("/delete", (req, res) => {
	let token = isTokenValid(req.headers["x-api-key"]);
	if (token === false) {
		return res.status(403).send({success: false, msg: "Invalid Token" });
	}
	if (!req.body.id) return res.status(400).send({success: false, msg: "No ID was provided"});

	// commentModel.findOneAndDelete({ _id: req.body.id }, err => {
	commentModel.findOneAndDelete({ _id: req.body.id, 'author.id': token.id }, err => {
		if (err) return res.status(500).send(err);
		return res.status(200).send({success: true, msg: "Comment successfully deleted!", id: req.body.id});
	});
	// return res.status(500).send({success: false, msg: "Please ensure that the author matches the request."});
});


module.exports = router;
