const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
	city_id: {
		type: String,
		required: true
	},
	title: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    cost_rating: {
        type: Number,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    author_id: {
        type: String,
        required: true,
    },
    activities: {
        type: Array,
        required: true,
    }
});

module.exports = mongoose.model('itinerary', itinerarySchema) 