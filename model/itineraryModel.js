import { Schema, model } from "mongoose";

const itinerarySchema = new Schema({
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

export default model('itinerary', itinerarySchema) 