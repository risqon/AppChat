const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    id: Number,
    username: String,
    message: String
  });

  module.exports = mongoose.model('Chat', chatSchema);
  