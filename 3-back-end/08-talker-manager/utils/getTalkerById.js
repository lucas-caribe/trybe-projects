const getTalkers = require('./getTalkers');

const getTalkerById = (id) => {
  const talkers = getTalkers();
  const talker = talkers.find(({ id: talkerId }) => talkerId === Number(id));

  return talker;
};

module.exports = getTalkerById;
