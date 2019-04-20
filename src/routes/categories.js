const router = require('express').Router();
const Channel = require('../models/Channel');
const { isAuthenticated } = require('../helpers/auth');


// router.get('/controlPanelChannel/successAjax', (req, res) => {
// 	/* const categories = await Categories.find();
// 	res.json(categories) */
// 	res.render('controlPanelChannel/successAjax');
// });

router.put('/controlPanelChannel/controlPanel', isAuthenticated, async (req, res) => {
	const { title, category } = req.body;
	const channel = await Channel.find({userChannel: req.user});
	await Channel.findByIdAndUpdate(channel[0]._id, {title, category});
	res.send();
});

/* router.put('/controlPanelChannel/ControlPanel:id', (req, res) => {
	console.log(req.params, req.body);
	res.json('recibido');
}) */

module.exports = router;