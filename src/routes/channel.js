const router = require('express').Router();
const User = require('../models/User');
const Channel = require('../models/Channel');
const Categories = require('../models/Categories');
const { isAuthenticated } = require('../helpers/auth');

router.get('/channel/channel/:id', async (req, res) => {
	let url = req.url;
	let id = url.substring(17);
	let userLoged = req.user;
	let follow = false;
	let categoryFilename = "";
	
	const userChannel = await User.findById(id);
	const followers = userChannel.followers.length;
	const followed = userChannel.followed.length;
	const channel = await Channel.find({userChannel: userChannel});

	const category = await Categories.find({name: channel[0].category});
	if (category.length > 0) {
		categoryFilename = category[0].filename;
	} 
	
	let arrayFollowers = userChannel.followers;
	if (userLoged) {
		userLoged = req.user.user;
	}
	for (let i = 0; i < arrayFollowers.length; i++) {
		if (userChannel.followers[i].name == undefined) {
			return; 
		} else if (arrayFollowers[i].name.includes(userLoged)) {
			follow = true;
		}
	}
	res.render('channel/channel', {id, userChannel, channel, followers, followed, follow, categoryFilename});
});


router.put('/channel/channel/:id', isAuthenticated, async (req, res) => {
	let url = req.url;
	let id = url.substring(17);
	let userLoged = req.user.user; // usuario de session
	let userLogedId = req.user._id; // id de usuario de session
	let userLogedFilename= req.user.filename; // ruta de la imagen de usuario de session
	const userChannel = await User.findById(id); // objeto del canal del usuario visitado
	await User.findByIdAndUpdate(id, {$push: {followers: {'name': userLoged, 'id': userLogedId, 'filename': userLogedFilename}}});
	await User.findByIdAndUpdate(userLogedId, {$push: {followed: {'name': userChannel.user, 'id': userChannel._id, 'filename': userChannel.filename}}});
	for (let i = 0; i < userChannel.followers.length; i++) { // recorro los seguidores del usuario visitado
		if (userChannel.followers[i].name == undefined) {
			return;
		} else if (userChannel.followers[i].name.includes(userLoged)) {
			await User.findByIdAndUpdate(id, {$pull: {followers: {'name': userLoged, 'id': userLogedId, 'filename': userLogedFilename}}});
			await User.findByIdAndUpdate(userLogedId, {$pull: {followed: {'name': userChannel.user, 'id': userChannel._id, 'filename': userChannel.filename}}});
		}
	}
	res.render('channel/channel');
});

module.exports = router;