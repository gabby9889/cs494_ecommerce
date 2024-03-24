import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error",
    };

    // Handler Invalid Mongoose ID Error
    if(err.name === "CastError") {
        const message = `Resouce not found. Invalid: ${err?.path}`;
        error = new ErrorHandler(message, 404);
    }

    // Handler Validation Error
    if(err.name === "ValidationError") {
        // .map() to show all errors, if applicable
        const message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorHandler(message, 400);
    }

    // Handler Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        error = new ErrorHandler(message, 400);
    }

    // Handler wrong JWT error
    if(err.name === "JsonWebTokenError") {
        const message = `JSON Web Token is invalid. Try again!`;
        error = new ErrorHandler(message, 400);
    }

    // Handler expired JWT error
    if(err.name === "TokenExpiredError") {
        const message = `JSON Web Token is expired. Try again!`;
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