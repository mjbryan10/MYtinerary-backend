import { Schema, model } from "mongoose";

const authorSchema = new Schema({
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
export default model('author', authorSchema) 