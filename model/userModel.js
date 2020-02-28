const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: false
	},
	img: {
        type: String,
        required: false
	},
	itineraries: {
		type: Array,
		required: false
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema) 