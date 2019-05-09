const router = require('express').Router();
const User = require('../models/User');
const Channel = require('../models/Channel');


router.get('/channel/followers/:id', async (req, res) => {
	let url = req.url;
	/* let id = url.substring(27); */
	let id = url.substring(19);
	let userLoged = req.user;
	let follow = false;
	
	const userChannel = await User.findById(id);
	const followers = userChannel.followers.length;
	const followed = userChannel.followed.length;

	const channel = await Channel.find({userChannel: userChannel});
	let arrayFollowers = userChannel.followers;

	if (userLoged) {
		userLoged = req.user.user;
	}
	if (arrayFollowers.includes(userLoged)) {
		follow = true;
	}
	const followeds = userChannel.followed;
	const followers1 = userChannel.followers;
	// const userChannel = await User.findById(id);
	// const followeds = userChannel.followers;
	// console.log(followeds);
	res.render('channel/followers', {id, userChannel, channel, followers, followed, follow, followeds, followers1});
});

module.exports = router;