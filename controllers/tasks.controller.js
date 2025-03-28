const {
  BadRequest,
  NotFoundError,
  ServerError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Task = require("../models/tasks.model");

const createTask = async (req, res) => {
    const { Name, Description, Category } = req.body;
    const task = await Task.create({
      Name,
      Description,
      Category,
      CreatedBy: req.user.id,
    });
    res.status(StatusCodes.CREATED).json(task);
};

const getAllTasks = async (req, res) => {
    const task = await Task.find();
    if (!task) throw new NotFoundError("No Task found");
    res.status(StatusCodes.OK).json({ task, noOfTasks: task.length });
};

const getSingleTask = async (req, res) => {
    const task = await Task.findOne({ CreatedBy: req.user.id, _id: req.params.id });
    if (!task) throw new NotFoundError("No Task found");
    res.status(StatusCodes.OK).json({ task});

};

const updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate(
      { CreatedBy: req.user.id, _id: req.params.id },
      { ...req.body },
	  {runValidators: true, new: true}
    );
    if (!task) throw new NotFoundError("No Task found");
    res.status(StatusCodes.OK).json(task);
};

const deleteTask = async (req, res) => {
    const task = await Task.findOneAndDelete({
		CreatedBy: req.user.id,
      _id: req.params.id,
    });
    if (!task) throw new NotFoundError("No Task found");
    res.status(StatusCodes.OK).json({ message: "Task deleted successfully" });
};

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
