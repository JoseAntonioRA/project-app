const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project-app', {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false
})
	.then(db => console.log('DB is connect'))
	.catch(err => console.log(err));