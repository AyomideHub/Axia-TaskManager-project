const {
  BadRequest,
  NotFoundError,
  unAuthorizedError,
  ServerError,
} = require("../errors");
const Task = require("../models/tasks.model");

const createTask = async (req, res) => {
  try {
    const { Name, Description, Category } = req.body;
    const task = await Task.create({
      Name,
      Description,
      Category,
      CreatedBy: req.user.id,
    });
    res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    console.log(error);
    throw new ServerError("something went wrong, try again later");
  }
};

const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find();
    if (!task) throw new NotFoundError("No Task found");
    res.status(StatusCodes.OK).json({ task, noOfTasks: task.length });
  } catch (error) {
    console.log(error);
    throw new ServerError("something went wrong, try again later");
  }
};

const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findOne({ CreatedBy: req.user.id, _id: req.params });
    if (!task) throw new NotFoundError("No Task found");

    res.status(StatusCodes.OK).json({ task});
  } catch (error) {
    console.log(error);
    throw new ServerError("something went wrong, try again later");
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { CreatedBy: req.user.id, _id: req.params },
      { ...req.body }
    );
    if (!task) throw new NotFoundError("No Task found");
    res.status(StatusCodes.OK).json(task);
  } catch (error) {
    console.log(error);
    throw new ServerError("something went wrong, try again later");
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
		CreatedBy: req.user.id,
      _id: req.params,
    });
    if (!task) throw new NotFoundError("No Task found");
    res.status(StatusCodes.OK).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    throw new ServerError("something went wrong, try again later");
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
