const checkString = require('../../utils/checkString');

const validatePasswordMiddleware = (request, _response, next) => {
  const { password } = request.body;

  if (!checkString(password)) {
    return next({ status: 400, message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return next({
      status: 400,
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

module.exports = validatePasswordMiddleware;
