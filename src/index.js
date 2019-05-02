const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');
const NodeMediaServer = require('node-media-server');
const multer = require('multer');

// Initializations
const app = express();
require('./database');
require('./config/passport');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
/* app.use(morgan('dev')); */
app.use(express.urlencoded({extended: false}));


app.use(methodOverride('_method'));
app.use(session({
	secret: 'mysecretapp',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public/img/uploads/'),
	filename: (req, file, cb, filename) => {
		cb(null, file.originalname);
	}
});
app.use(multer({storage: storage}).single('image'));
app.use(flash());


// Global Variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	res.locals.channel = req.channel || null;
	next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/controlPanelChannel'));
app.use(require('./routes/categories'));
app.use(require('./routes/channel'));
app.use(require('./routes/userProfile'));
app.use(require('./routes/disableAccount'));
app.use(require('./routes/channels-category.js'));



// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Config Server RTMP
const config = {
	rtmp: {
	  port: 1935,
	  chunk_size: 60000,
	  gop_cache: true,
	  ping: 30,
	  ping_timeout: 60
	}
  };
   
var nms = new NodeMediaServer(config)
nms.run();

// Server start
app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
});