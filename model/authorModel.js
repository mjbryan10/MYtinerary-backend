const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},

	img: {
        type: String,
        required: true
	},
	itineraries: {
		type: Array,
		required: true
	}
});

//name of module is the singular version (city) of the database name (cities)
module.exports = mongoose.model('author', authorSchema) 