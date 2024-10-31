const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
	login: {
		type: String,
		required: true,
		unique: true
	},
	phone: {
		type: String,
		required: true
	},
	birthday: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	friends: {
		type: Array,
		default: []
	},
	posts: {
		type: Array,
		default: []
	},
	comments: {
		type: Array,
		default: []
	},
	notification: {
		type: Array,
		default: []
	},
	requests: {
		type: Array,
		default: []
	},
	userType: {
		type: String,
		required: true
	},
})

module.exports = model('User', UserSchema)