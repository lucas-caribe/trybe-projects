const checkString = require('../../utils/checkString');

const validateTokenMiddleware = (request, _response, next) => {
  const { authorization: token } = request.headers;

  if (!checkString(token)) {
    return next({ status: 401, message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return next({ status: 401, message: 'Token inválido' });
  }

  next();
};

module.exports = validateTokenMiddleware;
