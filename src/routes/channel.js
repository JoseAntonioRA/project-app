const router = require('express').Router();
const User = require('../models/User');
const Channel = require('../models/Channel');

const { isAuthenticated } = require('../helpers/auth');

router.get('/channel/channel/:id', async (req, res) => {
	let url = req.url;
	let id = url.substring(17);
	let userLoged = req.user;
	let follow = false;
	
	const userChannel = await User.findById(id);
	const followers = userChannel.followers.length;
	const followed = userChannel.followed.length;

	const channel = await Channel.find({userChannel: userChannel});
	let arrayFollowers = userChannel.followers;

	if (userLoged) {
		userLoged = req.user.user;
	}
	if (arrayFollowers.includes(userLoged)) {
		follow = true;
	}

	res.render('channel/channel', {id, userChannel, channel, followers, followed, follow});
});


router.put('/channel/channel/:id', isAuthenticated, async (req, res) => {
	let url = req.url;
	let id = url.substring(17);
	let userLoged = req.user.user;
	let userLogedId = req.user._id;
	const userChannel = await User.findById(id);
	await User.findByIdAndUpdate(id, {$push: {followers: userLoged}});
	await User.findByIdAndUpdate(userLogedId, {$push: {followed: {'name': userChannel.user, 'id': userChannel._id, 'filename': userChannel.filename}}});
	if (userChannel.followers.includes(userLoged)) {
		await User.findByIdAndUpdate(id, {$pull: {followers: userLoged}});
		await User.findByIdAndUpdate(userLogedId, {$pull: {followed: {'name': userChannel.user, 'id': userChannel._id, 'filename': userChannel.filename}}});
	}
	/* let arrayFollowers = userChannel.followers; */
	res.render('channel/channel');
});

/* io.sockets.on("connection", function (socket) {
	socket.on("username", (req , res) => {
		socket.username = req.user.user;
		io.emit("is_online", "<i>" + socket.username + " se une al chat..</i>");
	});
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		 console.log('message: ' + msg);
	});
});

io.on('connection', function(socket){
  console.log('an user connected');
  socket.on('disconnect', function(){
	  console.log('user disconnected');
	});
}); */


/* router.post('/channel/channel/:id', isAuthenticated, async (req, res) => {

}); */

module.exports = router;