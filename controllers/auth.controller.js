const { users } = require("../models");
const utils = require("../utils");
const nodemailer = require("nodemailer");
const Sentry = require("@sentry/node");

module.exports = {
	register: async (req, res) => {
		try {
			const existingUser = await users.findFirst({
				where: {
					email: req.body.email,
				},
			});

			if (existingUser) {
				return res.render("error", {
					errorMessage: "Email is already registered",
				});
			}

			const data = await users.create({
				data: {
					email: req.body.email,
					password: await utils.cryptPassword(req.body.password),
				},
			});

			return res.render("success", {
				successMessage: "You have successfully registered!",
			});
		} catch (error) {
			console.error(error);
			Sentry.captureException(error);
			return res.render("error", {
				errorMessage: "An error occurred",
			});
		}
	},

	resetPassword: async (req, res) => {
		try {
			const findUser = await users.findFirst({
				where: {
					email: req.body.email,
				},
			});

			if (!findUser) {
				return res.render("error", {
					errorMessage: "User not found!",
				});
			}

			const resetPasswordToken = await utils.cryptPassword(req.body.email);

			await users.update({
				data: {
					resetPasswordToken,
				},
				where: {
					id: findUser.id,
				},
			});

			const transporter = nodemailer.createTransport({
				host: process.env.EMAIL_HOST,
				port: process.env.EMAIL_PORT,
				secure: false,
				auth: {
					user: process.env.EMAIL_USER,
					pass: process.env.EMAIL_PASSWORD,
				},
			});

			const mailOptions = {
				from: "system@gmail.com",
				to: req.body.email,
				subject: "Reset Password",
				html: `<p>Reset Password <a href="http://localhost:3000/set-password/${resetPasswordToken}">Click Here</a></p>`,
			};

			transporter.sendMail(mailOptions, (err) => {
				if (err) {
					console.log(err);
					return res.render("error", {
						errorMessage: "Invalid or expired reset key!",
					});
				}

				return res.render("success", {
					successMessage: "Password reset link was sent to your email!",
				});
			});
		} catch (error) {
			console.log(error);
			Sentry.captureException(error);
			return res.render("error", {
				errorMessage: "An error occurred",
			});
		}
	},

	setPassword: async (req, res) => {
		try {
			const findUser = await users.findFirst({
				where: {
					resetPasswordToken: req.body.key,
				},
			});

			if (!findUser) {
				return res.render("error", {
					errorMessage: "Invalid or expired reset key!",
				});
			}

			await users.update({
				data: {
					password: await utils.cryptPassword(req.body.password),
					resetPasswordToken: null,
				},
				where: {
					id: findUser.id,
				},
			});

			return res.render("success", {
				successMessage: "Password reset was successfully!",
			});
		} catch (error) {
			console.log(error);
			Sentry.captureException(error);
			return res.render("error", {
				errorMessage: "An error occurred",
			});
		}
	},
};
