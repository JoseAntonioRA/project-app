const router = require('express').Router();
const User = require('../models/User');
const Channel = require('../models/Channel');
const { isAuthenticated } = require('../helpers/auth');

router.get('/users/profile', isAuthenticated, (req, res) => {
	res.render('users/profile');
});

router.post('/users/profile', async (req, res) => {
	const fileName = req.file.filename;
	let userId = req.user._id;
	let userLoged = req.user.user; // usuario de session
	let users = await User.find(); // array de usuarios
	const channel = await Channel.find({userChannel: userId});
	let channelId = channel[0]._id;
	console.log(channelId);
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
						let name = value.name;
						let id = value.id;
						let filename = value.filename;
						await User.findByIdAndUpdate(element._id, {$push: {followed: {'name': name, 'id': id, 'filename': fileName}}});
						await User.findByIdAndUpdate(element._id, {$pull: {followed: {'name': userLoged, 'id': id, 'filename': filename}}});
					}
				});
			}
		}
	}
	await User.findByIdAndUpdate(userId, {filename: fileName});
	await Channel.findByIdAndUpdate(channelId, {filename: fileName});
	res.send('');
});

router.put('/users/profile', async (req, res) => {
	const {user, email} = req.body; // parametros recibidos a través de ajax y cogidos del formulario de la vista
	let userLogedId = req.user._id; // id de usuario de session
	let userLoged = req.user.user; // usuario de session
	let users = await User.find(); // array de usuarios
	const channel = await Channel.find({userChannel: userLogedId});
	let channelId = channel[0]._id;
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
						await User.findByIdAndUpdate(element._id, {$push: {followed: {'name': user, 'id': id, 'filename': filename}}});
						await User.findByIdAndUpdate(element._id, {$pull: {followed: {'name': userLoged, 'id': id, 'filename': filename}}});
					}
				});
			}
		}
	}
	await User.findByIdAndUpdate(userLogedId, {user, email});
	await Channel.findByIdAndUpdate(channelId, {userName: user});
	res.send('');
});

module.exports = router;