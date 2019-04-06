const router = require('express').Router();
const Channel = require('../models/Channel');
const { isAuthenticated } = require('../helpers/auth');

router.get('/controlPanelChannel/controlPanel/:id', isAuthenticated, async (req, res) => {
	/* const tmp = req.session.passport.user; */
	/* const channel = await Channel.findById(req.params.id); */
	const channel = await Channel.find({userChannel: req.user});
	/* console.log(channel); */
	// console.log(req.user);
	res.render('controlPanelChannel/controlPanel', { channel });
});

/* router.get('/controlPanelChannel/controlPanel/:id', async (req ,res) => {
	const channel = await Channel.find({userChannel: req.user});
	res.render('controlPanelChannel/controlPanel', { channel });
}); */

/* router.post('/controlPanelChannel/controlPanel', isAuthenticated, async (req, res) => {
	const {title, category} = req.body;
	const errors = [];

	Channel.findByIdAnd(req.id);

	req.flash('success_msg', 'Datos añadidos correctamente');
	res.redirect('/controlPañnelChannel/controlPanel');
}); */

module.exports = router;