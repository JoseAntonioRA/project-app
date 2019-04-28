const router = require('express').Router();
const Channel = require('../models/Channel');
const Categories = require('../models/Categories');
const { isAuthenticated } = require('../helpers/auth');

/* router.get('/controlPanelChannel/controlPanel', isAuthenticated, (req, res) => {
	res.json({
		products: ['product1', 'product2']
	});
}); */

router.get('/controlPanelChannel/controlPanel', isAuthenticated, async (req, res) => {
	/* const tmp = req.session.passport.user; */
	/* const channel = await Channel.findById(req.params.id); */
	const categories = await Categories.find();
	const channel = await Channel.find({userChannel: req.user});
	/* const channelTitle = channel[0].title.toLowerCase(); */
	/* console.log(categories); */
	res.render('controlPanelChannel/controlPanel', { channel, categories});

});

router.put('/controlPanelChannel/controlPanel', async (req, res) => {
	/* const channel = await Channel.find({userChannel: req.user});
	await Channel.findByIdAndUpdate(channel[0]._id, {live: true}); */
	const {title, category} = req.body;
	const channel = await Channel.find({userChannel: req.user});
	await Channel.findByIdAndUpdate(channel[0]._id, {title, category});
	
	res.send('');
	/* const channel = await Channel.find({userChannel: req.user});
	channel.forEach(channel => {
		if (channel.live) {
			res.redirect('channel/channel', {channel});
		}
	}); */
});

/* router.put('/controlPanelChannel/controlPanel', async (req, res) => {
	
	
}); */

/* router.get('/controlPanelChannel/controlPanel/:id', async (req ,res) => {
	const channel = await Channel.find({userChannel: req.user});
	res.render('controlPanelChannel/controlPanel', { channel });
}); */

/* router.post('/controlPanelChannel/controlPanel', isAuthenticated, async (req, res) => {
	
	const {title, category} = req.body;
	/*const errors = [];

	Channel.findByIdAnd(req.id);

	req.flash('success_msg', 'Datos añadidos correctamente');
	const channel = await Channel.find({userChannel: req.user});
	console.log(title, category);
	res.render('controlPanelChannel/controlPanel', { channel });
});*/ 

module.exports = router;