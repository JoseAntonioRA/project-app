const router = require('express').Router();
const Channel = require('../models/Channel');

router.get('/', async (req, res) => {
	const channels = await Channel.find();
	let liveChannel = false;
	
	const channel = await Channel.find({live: liveChannel});
	res.render('Index', {channels, channel});
});

module.exports = router;

