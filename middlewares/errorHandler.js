const errorhandlersMiddleware = (err, req, res, next) => {
	
	res.status(500).json({name: err.name, msg: err.message})
	console.log(err)
}

module.exports = {errorhandlersMiddleware}