const bcrypt = require("bcrypt");

const cryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(5);

	const hashedPassword = await bcrypt.hash(password, salt);

	const cleanedHash = hashedPassword.replace(/[./]/g, "");

	return cleanedHash;
};

module.exports = {
	cryptPassword,
};
