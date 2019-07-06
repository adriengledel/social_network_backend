const mongoose = require('mongoose');


var messageSchema = mongoose.Schema({
  userId : { type : String },
  texts  : { type : Array }
}, { timestamps: { createdAt: 'created_at' }});

module.exports = mongoose.model('messages', messageSchema);