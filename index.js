const express = require("express"),
	cors = require("cors"),
	app = express(),
	port = process.env.PORT || 3000,
	router = require("./routers");
bodyParser = require("body-parser");
const { configSentry } = require("./utils");
const Sentry = require("@sentry/node");

require("dotenv").config();
configSentry();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(router);
app.use(Sentry.Handlers.errorHandler());
app.listen(port, () => {
	console.log(`Server running at https://localhost:${port}`);
});
