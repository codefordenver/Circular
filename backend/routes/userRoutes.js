const mongoose = require('mongoose');
const Signature = mongoose.model('Signature');
const User = mongoose.model('User');
const async = require('async');

module.exports = app => {
	app.post('/api/users', async (req, res) => {
		const { googleId, name, email } = req.body;

		const user = await User.find({ googleId: req.params.googleId });

		if (!user) {
			const newUser = new User({
				googleId,
				name,
				email
			});
      const data = await newUser.save();
		}


		res.send(data);
	});
};
