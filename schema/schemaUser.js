const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../config/config');

var avatarSchema = mongoose.Schema({
	avatarName : {
		type : String,
		default : 'none',
	},
	avatarData : { type : String}
});

var userSchema = mongoose.Schema({
	logged : {type : Boolean},
	email: {
		type: String,
	/* 	lowercase: true,
		trim: true,
		unique: true,
		required: true */
	},
	role : {type : String},
	password: {
        type: String,
        required: true
	},
	pseudo : {trim: true,type: String},
	firstName : {trim: true,type: String},
	lastName : {trim: true,type: String},
	age : {trim: true,type: String},
	genre :{trim: true,type: String},
	avatar   : [avatarSchema],
	avatarUrl: {trim: true,type: String},
	avatarFile: {trim: true,type: Object},
	presentation: {trim: true,type: String},
	preferences: {trim: true,type: String},
	contactInformation: {trim: true,type: String},
	friends : {type : Object}
},{ timestamps: { createdAt: 'created_at' }});


userSchema.methods = {
	authenticate: function (password) {
		return passwordHash.verify(password, this.password);
	},
	getToken: function () {
		return jwt.encode(this, config.secret);
	}
}

module.exports = mongoose.model('User', userSchema);
