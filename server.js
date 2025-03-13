const { connectdb } = require('./db/db')
const { errorhandlersMiddleware } = require('./middlewares/errorHandler')
const { wrongRoute } = require('./middlewares/wrongRoute')
const express = require('express')
const app = express()


//express middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
















//errorhandlers
app.use(wrongRoute)
app.use(errorhandlersMiddleware)


const port = process.env.PORT || 5000

const start = async () => {
	try {
		await connectdb(process.env.MONGO_URI)
		await app.listen(port, ()=> console.log(`server running on port: ${port}`))
	} catch (error) {
		console.log(error)
	}
}

start()