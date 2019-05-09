const router = require('express').Router();
const User = require('../models/User');
const Channel = require('../models/Channel');
const { isAuthenticated } = require('../helpers/auth');

router.get('/users/disable-account', isAuthenticated, (req, res) => {
	res.render('users/disable-account');
});

router.post('/users/disable-account', isAuthenticated, async (req, res) => {
	const {user} = req.body;
	let userId = req.user._id;
	let userLoged = req.user.user; // usuario de session
	let users = await User.find(); // array de usuarios
	for (const userSchema in users) { // recorro todos los usuarios 
		if (users.hasOwnProperty(userSchema)) { // si existe dentro del array de objetos users, un userSchema 
			const element = users[userSchema]; // guardo el schema del usuario actual
			if (element.followed == undefined) {
				return;
			} else {
				element.followed.forEach(async value => { // recorro el array de los seguidos de cada usuario
					/* comparo el nombre que contiene el array de los seguidos con 
					el de la persona que va a cambiar su nombre */
					if (value.name == userLoged) {
						let id = value.id;
						let filename = value.filename;
						await User.findByIdAndUpdate(element._id, {$pull: {followed: {'name': userLoged, 'id': id, 'filename': filename}}});
						await User.findByIdAndUpdate(element._id, {$pull: {followers: {'name': userLoged, 'id': id, 'filename': filename}}});
						
					}
				});
				
			}
		}
	}
	await User.findByIdAndDelete(userId);
	const channel = await Channel.find({userChannel: req.user});
	await Channel.findByIdAndDelete(channel[0]._id);

	req.flash('success_msg', 'Cuenta dada de baja correctamente.');
	res.redirect('/');
});




module.exports = router;