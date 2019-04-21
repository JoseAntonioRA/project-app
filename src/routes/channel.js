const router = require('express').Router();

router.get('/channel/channel/:id', (req, res) => {
	let url = req.url;
	let id = url.substring(17);
	console.log(id);
	res.render('channel/channel', {id});
});

module.exports = router;