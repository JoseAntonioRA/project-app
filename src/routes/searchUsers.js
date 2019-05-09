const router = require('express').Router();
const User = require('../models/User');

router.get('/searchUsers', async (req, res) => {
	let users = await User.find();
	let usersName = [];
	for (let i = 0; i < users.length; i++) {
		usersName.push({'label': users[i].user, 'url': users[i]._id});
	}
	res.json(usersName);
});


module.exports = router;