const mongoose = require('mongoose');


var friendSchema = mongoose.Schema({
  id : { type : String },
  userId : { type : Array },
  statusId : { type : Number },
  status : { type : String },
  recommendBy : { type : String }
}, { timestamps: { createdAt: 'created_at' }});

module.exports = mongoose.model('friends', friendSchema);