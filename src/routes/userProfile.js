const router = require('express').Router();
const User = require('../models/User');
const { isAuthenticated } = require('../helpers/auth');

router.get('/users/profile', isAuthenticated,  (req, res) => {
	res.render('users/profile');
});

router.post('/users/profile', isAuthenticated, (req, res) => {
	res.send('subido');
});

module.exports = router;