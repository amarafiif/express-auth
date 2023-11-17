const bcrypt = require("bcrypt");
const express = require("express");
const Sentry = require("@sentry/node");
const app = express();

const configSentry = () => {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		integrations: [
			// enable HTTP calls tracing
			new Sentry.Integrations.Http({ tracing: true }),
			// enable Express.js middleware tracing
			new Sentry.Integrations.Express({ app }),
		],
		// Performance Monitoring
		tracesSampleRate: 1.0,
		// Set sampling rate for profiling - this is relative to tracesSampleRate
		profilesSampleRate: 1.0,
	});
};

const cryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(5);
	const hashedPassword = await bcrypt.hash(password, salt);
	const cleanedHash = hashedPassword.replace(/[./]/g, "");
	return cleanedHash;
};

module.exports = {
	cryptPassword,
	configSentry,
};
