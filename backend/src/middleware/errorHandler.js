export function notFoundHandler(req, res) {
  res.status(404).json({ message: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === 'production' && status === 500
      ? 'Erro interno do servidor.'
      : err.message || 'Erro interno do servidor.';

  res.status(status).json({ message });
}
