require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
require('express-async-errors');
const {connectdb} = require('./db/db')
const cookieParser = require('cookie-parser')
const AuthRoute = require('./routes/auth.route')
const TaskRoute = require('./routes/tasks.route')
const {wrongRoute} = require('./middlewares/wrongRoute')
const {errorhandlersMiddleware} = require('./middlewares/errorHandler')
const { deadlineRemainder } = require('./utils/CronJobs')
const Task = require('./models/tasks.model')
const User = require('./models/user.model')

// middleware
app.set('trust proxy', 10)
app.use(rateLimiter({
windowMs: 15 * 60 * 1000, // 15 minutes
max: 70, //limit each IP to 100 request per windowMs
}))
app.use(helmet())
app.use(xss())
app.use(cors())
app.use(cookieParser(process.env.COOKIES_SECRET))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// routes
app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/tasks', TaskRoute)


// errors
app.use(wrongRoute)
app.use(errorhandlersMiddleware)


//cronJOb to reamin users when the deadline to a task is approaching and send an email
deadlineRemainder(Task, User)

//server and connect to db 
const port = process.env.PORT || 5000
const start = async () => {
	try {
		await connectdb(process.env.MONGO_URI)
		app.listen(port, () => {
			console.log('server is running');
		})
	} catch (error) {
		console.log(error);
	}
}
start()
