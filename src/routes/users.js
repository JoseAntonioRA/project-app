const router = require('express').Router();
const User = require('../models/User');
const Channel = require('../models/Channel');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
	res.render('users/signin')
});

router.post('/users/signin', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/users/signin',
	failureFlash: true,
}));

router.get('/users/signup', (req, res) => {
	res.render('users/signup')
});

router.post('/users/signup', async (req, res) => {
	const {user, email, password, password2} = req.body;
	const errors = [];
	if (user.length <= 0) {
		errors.push({text: 'Por favor, inserte su nombre'});
	}
	if (password != password2) {
		errors.push({text: 'Las contraseñas no coinciden'});
	}
	if (password.length < 4) {
		errors.push({text: 'La contraseña debe tener almenos 4 caracteres'});
	}
	if (errors.length > 0) {
		res.render('users/signup', {errors, user, email, password, password2});
	} else {
		const emailUser = await User.findOne({email: email});
		
		if (emailUser) {
			req.flash('error_msg', 'El email ya está en uso');
			res.redirect('/users/signup');
		} else {
			const newUser = new User({
				user, 
				email, 
				password,
				filename: 'default-avatar.png',
				originalname: '',
				mimtype: ''
			});
			newUser.password = await newUser.encryptPassword(password);
			await newUser.save();
			
			const newChannel = new Channel({
				title: '',
				category: '',
				live: false,
				userChannel: newUser._id
			});
			await newChannel.save();
			req.flash('success_msg', 'Se ha registrado correctamente');
			res.redirect('/users/signin');
		}
	}
});

router.get('/users/logout', (req, res) => {
	req.logOut();
	res.redirect('/users/signin');
});

module.exports = router;