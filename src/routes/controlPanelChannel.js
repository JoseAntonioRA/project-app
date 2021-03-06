const router = require('express').Router();
const Channel = require('../models/Channel');
const User = require('../models/User');
const Categories = require('../models/Categories');
const { isAuthenticated } = require('../helpers/auth');

router.get('/controlPanelChannel/controlPanel', isAuthenticated, async (req, res) => {
	const categories = await Categories.find();
	const channel = await Channel.find({userChannel: req.user});
	res.render('controlPanelChannel/controlPanel', { channel, categories});

});

router.put('/controlPanelChannel/controlPanel', async (req, res) => {
	const {title, category} = req.body;
	
	const channel = await Channel.find({userChannel: req.user});
	await Channel.findByIdAndUpdate(channel[0]._id, {title, category});
	
	res.send('');
});

router.post('/controlPanelChannel/controlPanel', async (req, res) => {
	let id = req.user.id;
	const channel = await Channel.find({userChannel: req.user});
	await Channel.findByIdAndUpdate(channel[0]._id, {live: true});
	await User.findByIdAndUpdate(channel[0].userChannel, {live: true});
	if (channel[0].live) {
		await Channel.findByIdAndUpdate(channel[0]._id, {live: false});
		await User.findByIdAndUpdate(channel[0].userChannel, {live: false});
	}
	res.send('');
});

module.exports = router;