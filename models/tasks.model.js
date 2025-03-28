const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
	Name: {
		type: String,
		required: [true, "please provide the name of the task"],
		unique: true,
		immutable: [true, "Can't change the name of the task"]
	},
	Description: {
		type: String,
		required: [true, "please provide a description for the tasks"],
	},
	Category: {
		type: String,
		required: true,
	},
	Status: {
		type: String,
		enum: ['completed', 'incomplete'],
		default: 'incomplete'
	},
	CreatedBy:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}

}, {timestamps: true})


module.exports = mongoose.model('Task', TaskSchema)