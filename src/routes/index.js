const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('Index');
});

module.exports = router;

