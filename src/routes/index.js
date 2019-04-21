const router = require('express').Router();
const Channel = require('../models/Channel');

router.get('/', async (req, res) => {
	const channel = await Channel.find();
	res.render('Index', {channel});
});

module.exports = router;

