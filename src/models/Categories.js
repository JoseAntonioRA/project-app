const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategoriesSchema = new Schema({
	name: {type: String},
	filename: {type: String}
});

module.exports = mongoose.model("Categories", CategoriesSchema);