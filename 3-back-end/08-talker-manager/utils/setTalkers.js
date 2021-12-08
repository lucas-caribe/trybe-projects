const fs = require('fs');

const setTalkers = (talkers) => {
  fs.writeFileSync('./talker.json', JSON.stringify(talkers));
};

module.exports = setTalkers;
