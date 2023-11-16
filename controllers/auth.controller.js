const { users } = require("../models");
const utils = require("../utils");

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
				successMessage: "You have successfully registered",
			});
		} catch (error) {
			console.error(error);
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
					errorMessage: "An error occurred",
				});
			}

			await users.update({
				data: {
					resetPasswordToken: await utils.cryptPassword(req.body.email),
				},
				where: {
					id: findUser.id,
				},
			});

			return res.render("success", {
				successMessage: "Password reset link was sent to your email!",
			});
		} catch (error) {
			console.log(error);
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
					errorMessage: "Data not found!",
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
				successMessage: "Reset password was successfully!",
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				error,
			});
		}
	},
};
