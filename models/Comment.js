const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
})

module.exports = mongoose.model("Comment", CommentSchema);