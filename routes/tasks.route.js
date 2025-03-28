const router = require('express').Router()
const  {authenticateUser} = require('../middlewares/authentication')
const {createTask, getAllTasks, getSingleTask, updateTask, deleteTask} = require('../controllers/tasks.controller')


router.route('/').post(authenticateUser, createTask).get(authenticateUser, getAllTasks)
router.route('/:id').patch(authenticateUser, updateTask).delete(authenticateUser, deleteTask).get(authenticateUser, getSingleTask)



module.exports = router