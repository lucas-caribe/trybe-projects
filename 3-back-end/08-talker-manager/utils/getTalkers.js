const fs = require('fs');

const getTalkers = () => {
  try {
    const talkers = fs.readFileSync('./talker.json');
    const parsedTalkers = JSON.parse(talkers);

    return parsedTalkers;
  } catch (error) {
    return [];
  }
};

module.exports = getTalkers;
