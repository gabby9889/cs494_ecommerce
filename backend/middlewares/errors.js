import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error",
    };

    // Handler Invalid Mongoose ID Error
    if(err.name === "CastError") {
        const message = `Resouce not fund. Invalid: ${err?.path}`;
        error = new ErrorHandler(message, 404);
    }

    // Handler Validation Error
    if(err.name === "ValidationError") {
        // .map() to show all errors, if applicable
        const message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorHandler(message, 400);
    }



    if (process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(error.statusCode).json( {
            message: error.message,
            error: err,
            stack: err?.stack,
        });        
    }

    if (process.env.NODE_ENV === "PRODUCTION") {
        res.status(error.statusCode).json( {
            meesage: error.message,
        });        
    }                                               
}