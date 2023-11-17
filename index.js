const express = require("express"),
	cors = require("cors"),
	app = express(),
	port = process.env.PORT || 3000,
	router = require("./routers"),
	bodyParser = require("body-parser"),
	{ configSentry } = require("./utils"),
	Sentry = require("@sentry/node"),
	http = require("http").Server(app),
	io = require("socket.io")(http);

require("dotenv").config();
configSentry();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(router);

io.on("connection", (socket) => {
	console.log("A user connected");

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

app.use(Sentry.Handlers.errorHandler());
http.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
