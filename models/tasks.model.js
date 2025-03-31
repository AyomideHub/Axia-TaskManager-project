const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
	Name: {
		type: String,
		required: [true, "please provide the name of the task"],
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
	Deadline:{
		type: Date,
		required: true,
	},
	reminderSent:{
		type: Boolean,
		default: false
	},
	CreatedBy:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}

}, {timestamps: true})

TaskSchema.pre("save", async function (next) {
	if (this.isModified("Deadline")) {
	  this.Deadline = await new Date(this.Deadline).toISOString();
	}
	next();
  });
module.exports = mongoose.model('Task', TaskSchema)