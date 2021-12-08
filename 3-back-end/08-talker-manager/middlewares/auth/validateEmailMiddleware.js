const checkString = require('../../utils/checkString');

const validateEmailMiddleware = (request, _response, next) => {
  const { email } = request.body;
  const emailRegex = /^[a-z0-9\-_]+@[a-z]+\.[a-z]{2,}$/;

  if (!checkString(email)) {
    return next({ status: 400, message: 'O campo "email" é obrigatório' });
  }

  if (!emailRegex.test(email)) {
    return next({
      status: 400,
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

module.exports = validateEmailMiddleware;
