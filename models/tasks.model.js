const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
	Name: {
		type: String,
		required: [true, "please provide the name of the task"],
		unique: true,
		immutable: true
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


module.exports = mongoose.Model('Task', TaskSchema)