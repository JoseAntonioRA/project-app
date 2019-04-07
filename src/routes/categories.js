const router = require('express').Router();
const Categories = require('../models/Categories');
const Channel = require('../models/Channel');
const morgan = require('morgan');
const { isAuthenticated } = require('../helpers/auth');


/* router.get('/controlPanelChannel/controlPanel/categories', isAuthenticated, async (req, res) => {
	const categories = await Categories.find();
	res.json(categories)
}); */

router.put('/controlPanelChannel/ControlPanel/categories', isAuthenticated, async (req, res) => {
	const { title, category } = req.body;
	const channel = await Channel.find({userChannel: req.user});
	await Channel.findByIdAndUpdate(channel[0]._id, {title, category});
	/* console.log(chanelUpdate); */
});

/* router.put('/controlPanelChannel/ControlPanel:id', (req, res) => {
	console.log(req.params, req.body);
	res.json('recibido');
}) */



module.exports = router;