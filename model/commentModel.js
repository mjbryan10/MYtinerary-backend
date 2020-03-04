const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	itin_id: {
		type: String,
		required: true,
	},
	comments: [{
		author_id: String,
		author: String,
        // title: String,
        body: String,
        // likes: Array,
        // score: Number,
	}],
});

module.exports = mongoose.model("comment", commentSchema);
