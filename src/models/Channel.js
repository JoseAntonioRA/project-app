const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = mongoose.model('User');

const ChannelSchema = new Schema({
	title: {type: String},
	category: {type: String},
	live: {type: Boolean},
	userChannel: {type: Schema.ObjectId, ref: User}
});

module.exports = mongoose.model("Channel", ChannelSchema);
