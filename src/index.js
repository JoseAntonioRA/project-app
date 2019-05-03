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
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Settings
/* http('port', process.env.PORT || 3000); */
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


// Configuración del chat.
io.sockets.on('connection', function(socket){
	socket.on('username', function (username) {
		if (username == "") {
			socket.username = "guest";
		} else {
			socket.username = username;
		}
		
		io.emit("is_online", "<i>" + socket.username + " se ha unido al chat...</i>");
	});

	socket.on("disconnect", function(username) {
		if (username == "") {
			username = "guest";
		}
		io.emit(
			"is_online",
			"<i>" + socket.username + " ha dejado el chat... </i>"
		);
	});

	socket.on("chat_message", function(message) {
		io.emit(
			"chat_message",
			"<strong>" + socket.username + "</strong>: " + message
		);
	});
	
});

// Server start
http.listen(3030, function(){
	console.log('Server listening on port *:3030');
  });

