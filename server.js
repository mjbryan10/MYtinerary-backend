import express from "express";
import { connect } from "mongoose";
import { uri as URI } from "./config.js";
import { json, urlencoded } from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(json());
app.use(
	urlencoded({
		extended: true,
	})
);
app.use(cors());
app.listen(port, () => {
	console.log("Server is running on " + port + "port");
});
connect(URI, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true })
	.then(() => console.log("Connection to Mongo DB established"))
	.catch(err => console.log(err));

app.use("/citiesAPI", require("./routes/cities"));
app.use("/itinerariesAPI", require("./routes/itineraries"));
app.use("/authorsAPI", require("./routes/authors"));
app.use("/usersAPI", require("./routes/users"));
