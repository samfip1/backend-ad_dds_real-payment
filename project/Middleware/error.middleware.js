
const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };

        error.message = err.message;

        
        console.error(err);

        if (err.name === "CastError") {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorResponse(message, 404);
        }

        // Mongoose duplicate key
        if (err.code === 11000) {
            const message = "Duplicate field value entered";
            error = new ErrorResponse(message, 400);
        }

        // mongoose validation error
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map((val) => val.message);
            error = new ErrorResponse(message, 400);
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Server Error",
        });
    } catch (error) {
        next(error);
    }
}


export default errorMiddleware;