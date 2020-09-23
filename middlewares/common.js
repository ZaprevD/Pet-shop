
logger = (req, res, next) => {
    console.log(`Requested! Method: ${req.method} , URL: ${req.url}`);
    next();
}

wrongRouteHandler = (req, res, next) => {
    let error = new Error(`Route does not exists please try again with another route`);
    error.status = 404;
    next(error);
};

errorHandler = (err, req, res, next) => {
    let errObj = {
        status : err.status,
        error: {
            message: err.message
        }
    };
    res.status(errObj.status).json(errObj);
};

module.exports = { logger, wrongRouteHandler, errorHandler };