const router = require('express').Router();
const Categories = require('../models/Categories');
const Channel = require('../models/Channel');

router.get('/channels-category/channels/:name', async (req, res) => {
	let url = req.url;
	let nameCategory = url.substring(28);
	let name = "";
	let tmp = nameCategory.split("%20");
	 for (let i = 0; i < tmp.length; i++) {
		name += tmp[i] + " ";
	}
	name = name.substr(0, name.length-1);
	const channels = await Channel.find({category: name});
	const categories = await Categories.find({name: name});
	const categoryFilename = categories[0].filename;
	res.render('channels-category/channels', {channels, name, categoryFilename});
});

module.exports = router;