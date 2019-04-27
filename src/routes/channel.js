const router = require('express').Router();
const User = require('../models/User');
const Channel = require('../models/Channel');

router.get('/channel/channel/:id', async (req, res) => {
	let url = req.url;
	let id = url.substring(17);
	const user = await User.findById(id);
	const channel = await Channel.find({userChannel: user});
	res.render('channel/channel', {id, user, channel});
});

module.exports = router;