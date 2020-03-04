const express = require("express");
const commentModel = require("../model/commentModel");
const userModel = require("../model/userModel");
const isTokenValid = require("../global/tokenValidation");
const router = express.Router();

router.post("/post", (req, res) => {
	let token = isTokenValid(req.headers["x-api-key"]);
	if (token === false) {
		return res.status(403).send({ error: "Invalid Token" });
	}
	if (!req.body.comment) {
		return res.status(400).send({ error: "Must require author_id and body text" });
	}
	// let userName = "";
	// userModel.findOne({ _id: token.id }).then(user => {
    //     userName = user.name || user.email;
    // })
    //     .then(userName => {

    //     })
    
    
    console.log("token", token);
	let payload = {
		author_id: token.id,
		// author: userName,
		body: req.body.comment,
	};
	//Query if exists
	commentModel.findOne({ itin_id: req.body.itin }).then(itin => {
		if (itin) {
			commentModel.update({ itin_id: req.body.itin }, { $push: { 'comments': payload } } , (err, document) => {
                console.log(document)
            });
			return res.send("Comment updated");
		} else {
			const newComment = new commentModel({
				itin_id: req.body.itin,
				comments: [
					{
						author_id: token,
						author: userName,
						body: req.body.comment,
					},
				],
			});
			newComment
				.save()
				.then(comment => {
					res.send(comment);
				})
				.catch(err => console.error(err));
			return res.send("Comment created");
		}
	});
});

module.exports = router;
