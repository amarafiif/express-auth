const express = require("express"),
	router = express.Router(),
	controller = require("../controllers/auth.controller"),
	{ users } = require("../models");

router.get("/", async (req, res) => {
	return res.render("index");
});

router.get("/reset-password", (req, res) => {
	return res.render("reset-password");
});

router.get("/set-password/:key", async (req, res) => {
	try {
		console.log("Reset Password Token:", req.params.key);

		const findData = await users.findFirst({
			where: {
				resetPasswordToken: req.params.key,
			},
		});

		console.log("Found Data:", findData);

		if (!findData) {
			return res.render("error", {
				errorMessage: "Data not found!",
			});
		}

		return res.render("set-password", { user: findData });
	} catch (error) {
		console.log(error);
		return res.render("error", {
			errorMessage: "Data not found!",
		});
	}
});

router.post("/api/v1/register", controller.register);
router.post("/api/v1/reset-password", controller.resetPassword);
router.post("/api/v1/set-password", controller.setPassword);

module.exports = router;
