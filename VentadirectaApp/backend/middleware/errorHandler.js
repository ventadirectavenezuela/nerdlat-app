function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  // En desarrollo muestra el stack, en producción no
  const stack = process.env.NODE_ENV === 'production' ? null : err.stack;

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    stack
  });
}

module.exports = errorHandler;
