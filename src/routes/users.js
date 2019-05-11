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
	let regEmail = new RegExp(/^([\w\.\+]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/);
	let regPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24}$/);
	const errors = [];
	if (user.length <= 0) {
		errors.push({text: 'Por favor, inserte su nombre'});
	}
	if (user.length >= 15) {
		errors.push({text: 'Su alias no puede contener mas de 15 caracteres'});
	}
	
	if (!regPassword.test(password)) {
		errors.push({text: 'La contraseña debe de contener al menos 1 letra mayúscula y minúscula, 1 número y que la contraseña contenga entre {8,24} caracteres'});
	}
	if (password != password2) {
		errors.push({text: 'Las contraseñas no coinciden'});
	}

	if (!regEmail.test(email)) {
		errors.push({text: 'El formato del Email no es correcto, {test@test.com}'});
	}
	const emailUser = await User.findOne({email: email});
	const nameUser = await User.findOne({user: user});
	if (nameUser) {
		errors.push({text: 'El nombre de usuario ya está en uso'});
	} else 
	if (emailUser) {
		errors.push({text: 'El email ya está en uso'});
	}
	if (errors.length > 0) {
		res.render('users/signup', {errors, user, email, password, password2});
	} else {
		const newUser = new User({
			user, 
			email,
			password,
			filename: 'default-avatar.png',
		});
		newUser.password = await newUser.encryptPassword(password);
		await newUser.save();
		
		const newChannel = new Channel({
			title: '',
			category: '',
			live: false,
			userChannel: newUser._id,
			userName: user,
			filename: 'default-avatar.png',
		});
		await newChannel.save();
		req.flash('success_msg', 'Se ha registrado correctamente');
		res.redirect('/users/signin');
	}
});

router.get('/users/logout', (req, res) => {
	req.logOut();
	res.redirect('/users/signin');
});

module.exports = router;