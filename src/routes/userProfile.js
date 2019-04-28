const router = require('express').Router();
const User = require('../models/User');
const { isAuthenticated } = require('../helpers/auth');

router.get('/users/profile', isAuthenticated, (req, res) => {
	res.render('users/profile');
});

router.post('/users/profile', async (req, res) => {
	const fileName = req.file.filename;
	let userId = req.user._id;
	await User.findByIdAndUpdate(userId, {filename: fileName});
	res.send('');
});

router.put('/users/profile', async (req, res) => {
	const {user, email} = req.body;
	const userId = req.user._id;
	await User.findByIdAndUpdate(userId, {user, email});
	
	res.send('');
});

module.exports = router;