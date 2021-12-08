const generateToken = require('../../utils/generateToken');

const generateTokenMiddleware = (_request, response, _next) => {
  const token = generateToken();

  return response.status(200).json({ token });
};

module.exports = generateTokenMiddleware;
