const checkString = require('../../utils/checkString');

const validateNameMiddleware = (request, _response, next) => {
  const { name } = request.body;

  if (!checkString(name)) {
    return next({ status: 400, message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return next({
      status: 400,
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

module.exports = validateNameMiddleware;
