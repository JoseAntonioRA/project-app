const router = require('express').Router();

router.get('/channel/channel', (req, res) => {
	res.render('channel/channel');
});





module.exports = router;