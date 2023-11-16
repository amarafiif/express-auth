const express = require("express"),
	cors = require("cors"),
	app = express(),
	port = process.env.PORT || 3000,
	router = require("./routers");
bodyParser = require("body-parser");

require("dotenv").config();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
	console.log(`Server running at https://localhost:${port}`);
});
