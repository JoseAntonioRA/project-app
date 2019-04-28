const router = require('express').Router();
const User = require('../models/User');
const Channel = require('../models/Channel');
const { isAuthenticated } = require('../helpers/auth');

router.get('/users/disable-account', isAuthenticated, (req, res) => {
	res.render('users/disable-account');
});

router.post('/users/disable-account', isAuthenticated, async (req, res) => {
	const {user} = req.body;
	let userId = req.user._id;
	await User.findByIdAndDelete(userId);
	const channel = await Channel.find({userChannel: req.user});
	await Channel.findByIdAndDelete(channel[0]._id);

	req.flash('success_msg', 'Cuenta dada de baja correctamente.');
	res.redirect('/');
});




module.exports = router;