const validateAgeMiddleware = (request, _response, next) => {
  const { age } = request.body;

  if (!age) {
    return next({ status: 400, message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return next({
      status: 400,
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

module.exports = validateAgeMiddleware;
