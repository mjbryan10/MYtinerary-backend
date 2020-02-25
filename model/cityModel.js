import { Schema, model } from "mongoose";

const citySchema = new Schema({
	name: {
		type: String,
		required: true
	},

	country: {
        type: String,
        required: true
    },
});

//name of module is the singular version (city) of the database name (cities)
export default model('city', citySchema) 