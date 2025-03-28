const { BadRequest, NotFoundError, ServerError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Task = require("../models/tasks.model");

const createTask = async (req, res) => {
  const { Name, Description, Category, Deadline } = req.body;
  if (Deadline && new Date(Deadline) < Date.now()) {
    throw new BadRequest("invalid Deadline");
  }

  const task = await Task.create({
    Name,
    Description,
    Category,
    Deadline,
    CreatedBy: req.user.id,
  });
  res.status(StatusCodes.CREATED).json(task);
};

const getAllTasks = async (req, res) => {
  const { sort, order, page, limit, name, category } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.Name = { $regex: name, $options: 'i' }; // use to match pattern with the name passed in - from mongodb docs
  }
  if (category) {
    queryObject.Category = { $regex: category, $options: 'i' }; 
  }

 
  const SortBy = sort || "Deadline";
  const OrderBy = order === "asc" ? 1 : -1;
  const sorting = {};
  sorting[SortBy] = OrderBy;
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 5;
  const Skip = (pageNumber - 1) * limitNumber;
  
  const TotalTasks = await Task.countDocuments(queryObject);
  const NumOfPages = Math.ceil(TotalTasks / limitNumber);

  const task = await Task.find(queryObject).sort(sorting).skip(Skip).limit(limitNumber);
  if (!task) throw new NotFoundError("No Task found");
  res.status(StatusCodes.OK).json({ task, TotalTasks, NumOfPages, TasksPerPage: task.length});
};

const getSingleTask = async (req, res) => {
  const task = await Task.findOne({
    CreatedBy: req.user.id,
    _id: req.params.id,
  });
  if (!task) throw new NotFoundError("No Task found");
  res.status(StatusCodes.OK).json({ task });
};

const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { CreatedBy: req.user.id, _id: req.params.id },
    { ...req.body },
    { runValidators: true, new: true }
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
