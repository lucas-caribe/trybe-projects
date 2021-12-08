const validateRateMiddleware = (request, _response, next) => {
  const { talk } = request.body;
  const { rate } = talk;

  if (rate < 1 || rate > 5) {
    return next({
      status: 400,
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = validateRateMiddleware;
