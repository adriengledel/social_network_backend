const mongoose = require('mongoose');


var topicSchema = mongoose.Schema({
  adminTopicId : { type : String },
  topic        : { type : String },
  topicId      : { type : String },
  inviteId     : { type : Array },
  confirmId    : { type : Array },
  messages     : { type : Array }
}, { timestamps: { createdAt: 'created_at' }});

module.exports = mongoose.model('topics', topicSchema);