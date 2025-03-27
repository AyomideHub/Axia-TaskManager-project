const { BadRequest, NotFoundError, unAuthorizedError } = require("../errors");
const Task = require("../models/tasks.model");


const createTask = async (req, res) => {
	try {
	const { Name, Description, Category} = req.body
	const task = await Task.create({
		Name, 
		Description, 
		Category,
		CreatedBy: req.user.id,
	  });
	  if (!task) throw new BadRequest("select and items");
  
	  res.status(StatusCodes.CREATED).json(task);
	}
		
	} catch (error) {
		console.log(error)
	}
}

const getAllTasks = async (req, res) => {
  const task = await Task.find()
    .sort({ updatedAt: 1 })
    .populate({ path: "product", populate: { path: "productId" } })
    .populate({ path: "userId", select: "_id name email" });
  if (!task) throw new NotFoundError("No Task found");

  //const count = await Task.countDocuments()

  res.status(StatusCodes.OK).json({ task, noOfTasks: task.length });
};

const getSingleTask = async (req, res) => {
  const task = await Task.findOne({ userId: req.user.id })
    .populate({
      path: "product",
      populate: { path: "productId", select: "name price imageurl" },
    })
    .populate({ path: "userId", select: "_id name email" });
  if (!task) throw new BadRequest("No Task found");
  // console.log(task.product.length)
  res.status(StatusCodes.OK).json({ task, NoOfItems: task.product.length });
};

const updateTask = async (req, res) => {
  // to remove an item from  task, if the is no more items in the task the task will be deleted

  const task = await Task.findOneAndUpdate(
    { userId: req.user.id },
    { $pull: { product: { _id: req.params.id } } },
    { runValidators: true, new: true }
  )
    .populate({
      path: "product",
      populate: { path: "productId", select: "name price imageurl" },
    })
    .populate({ path: "userId", select: "_id name email" });
  if (!task) throw new BadRequest("No Task found");

  if (task.product.length <= 0) {
    await Task.findOneAndDelete({ userId: req.user.id });
    return res.status(StatusCodes.OK).json({ message: "Your task is Empty" });
  }

  res.status(StatusCodes.OK).json(task);
};

const deleteTask = async (req, res) => {
  // to delete the whole task completely
  const task = await Task.findOneAndDelete({ userId: req.user.id });
  if (!task) throw new BadRequest("No Task found");

  res.status(StatusCodes.OK).json({ message: "Task deleted successfully" });
};

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
