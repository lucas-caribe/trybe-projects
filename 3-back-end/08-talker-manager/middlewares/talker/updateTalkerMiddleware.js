const getTalkers = require('../../utils/getTalkers');
const setTalkers = require('../../utils/setTalkers');

const updateTalkMiddleware = (request, response) => {
  try {
    const id = Number(request.params.id);
    const { name, age, talk } = request.body;

    const talkers = getTalkers();
    const newTalker = { id, name, age, talk };
    const newTalkers = talkers.map((talker) =>
      (talker.id === id ? newTalker : talker));

    setTalkers(newTalkers);

    return response.status(200).json(newTalker);
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = updateTalkMiddleware;
