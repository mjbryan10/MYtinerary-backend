const express = require("express");
const mongoose = require("mongoose");
const URI = require("./config.js").uri;
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const app = express();
const port = process.env.PORT || 5000;

app.use(passport.initialize());
// require("./passport.js");

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(cors());
app.listen(port, () => {
	console.log("Server is running on " + port + "port");
});
mongoose
	.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
	.then(() => console.log("Connection to Mongo DB established"))
	.catch(err => console.log(err));

app.use("/citiesAPI", require("./routes/cities"));
app.use("/itinerariesAPI", require("./routes/itineraries"));
app.use("/authorsAPI", require("./routes/authors"));
app.use("/usersAPI", require("./routes/users"));
app.use("/commentsAPI", require("./routes/comments"));
