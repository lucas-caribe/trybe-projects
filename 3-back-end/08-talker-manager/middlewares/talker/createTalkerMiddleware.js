const getTalkers = require('../../utils/getTalkers');
const setTalkers = require('../../utils/setTalkers');

const createTalkMiddleware = (request, response) => {
  const talkers = getTalkers();
  const lastTalker = talkers[talkers.length - 1];

  const { name, age, talk } = request.body;
  const talkerInfo = { id: lastTalker.id + 1, name, age, talk };

  const newTalkers = [...talkers, talkerInfo];

  setTalkers(newTalkers);

  return response.status(201).json(talkerInfo);
};

module.exports = createTalkMiddleware;
