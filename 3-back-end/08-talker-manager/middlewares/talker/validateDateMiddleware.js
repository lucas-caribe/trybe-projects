const checkString = require('../../utils/checkString');

const validateDate = (date) => {
  try {
    const [day, month, year] = date.split('/');
    const checkDate = new Date(`${month}/${day}/${year}`);

    if (checkDate.toString() === 'Invalid Date') {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

const validateDateMiddleware = (request, _response, next) => {
  const { talk } = request.body;
  const { watchedAt } = talk;

  if (!checkString(watchedAt)) {
    return next({
      status: 400,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  if (!validateDate(watchedAt)) {
    return next({
      status: 400,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

module.exports = validateDateMiddleware;
