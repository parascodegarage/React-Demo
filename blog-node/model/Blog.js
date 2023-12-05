const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./User'); 

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String, 
    required: true,
  },
  auther: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = { Blog };
