const router = require('express').Router();
const { isAuthenticated } = require('../helpers/auth');

router.get('/', (req, res) => {
	res.render('Index');
});

module.exports = router;

