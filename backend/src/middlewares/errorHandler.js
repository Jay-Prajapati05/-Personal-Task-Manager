// export const errorHandler = (err, req, res, next) => {
//   const statusCode = err.statusCode || 500;

//   // isOperational = an error we raised on purpose (404, 410, etc.)
//   // if false, it's an unexpected bug, so don't send the raw message to the client
//   const message = err.isOperational
//     ? err.message
//     : "Something went wrong on the server";

// //   if (process.env.NODE_ENV !== "production") {
// //     console.error(err); //  show the full error in dev for debugging
// //   }

//   res.status(statusCode).json({
//     success: false,
//     message
//     // ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
//   });
// };

export const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }

  const statusCode = err.statusCode || 500;

  const message = err.isOperational
    ? err.message
    : "Something went wrong on the server";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
