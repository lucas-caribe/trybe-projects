const checkString = require('../../utils/checkString');
const getTalkers = require('../../utils/getTalkers');

const validateSearchMiddleware = (request, response) => {
  const { q } = request.query;

  const talkers = getTalkers();

  if (!checkString(q)) {
    return response.status(200).json(talkers);
  }

  const filteredTalkers = talkers.filter(({ name }) => {
    const lcSearch = q.toLowerCase();
    const lcName = name.toLowerCase();

    return lcName.includes(lcSearch);
  });

  return response.json(filteredTalkers);
};

module.exports = validateSearchMiddleware;
