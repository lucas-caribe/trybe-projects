const getTalkers = require('../../utils/getTalkers');
const setTalkers = require('../../utils/setTalkers');

const deleteTalkMiddleware = (request, response) => {
  const id = Number(request.params.id);

  const talkers = getTalkers();
  const newTalkers = talkers.filter(({ id: talkId }) => talkId !== id);

  setTalkers(newTalkers);

  return response
    .status(200)
    .json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalkMiddleware;
