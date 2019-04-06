const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
	usernameField: 'email'
}, async (email, password, done) => {
	const user = await User.findOne({email: email});
	const match = await user.matchPassword(password);
	if (!user || !match) {
		return done(null, false, {message: 'Email o contraseña incorrectos'});
	} else {
		return done(null, user);
	}
}));

/* Cuando el usuario se authentique guardo su id en una session */
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});