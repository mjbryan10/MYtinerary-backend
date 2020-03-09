const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	itin_id: {
		type: String,
		required: true,
	},
	posted: {
		type: Number,
		required: true,
	},
	author: {
		id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	title: {
		type: String,
		required: false,
	},
	text: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: false,
	},
	likes: {
		type: Array,
		required: false,
	}
});

module.exports = mongoose.model("comment", commentSchema);
