
logger = (req, res, next) => {
    console.log(`Requested! Method: ${req.method} , URL: ${req.url}`);
    next();
}

// uploadImage = async (req, res, next) => {
//     try {
//         if (req.files !== null) {
//             const file = req.files.productImage;
//             file.mv(`pet-shop/public/products-images/${file.name}`, err => {
//                 if (err) {
//                     console.log(err);
//                     res.status(500).send(err);
//                 }
//                next();
//             })
//         }else{
//             next();
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

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