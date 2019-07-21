const mongoose = require('mongoose');

var messagesSchema = mongoose.Schema({
  id       : { type : String },
  senderId : { type : String },
  recipientId : { type : String },
  text     : { type : String },
  date     : { type : Date },
  responses : { type : Array }
}) 

var wallSchema = mongoose.Schema({
  userId : { type : String },
  messages  : [messagesSchema]
}, { timestamps: { createdAt: 'created_at' }});


module.exports = mongoose.model('walls', wallSchema);