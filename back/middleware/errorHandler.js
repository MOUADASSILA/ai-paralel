/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {

  console.error('ERROR:', err);
  
 
  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong on the server';
  

  const errorResponse = {
    status: 'error',
    message,
  };
  

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }
 

  res.status(status).json(errorResponse);
};

module.exports = errorHandler;
