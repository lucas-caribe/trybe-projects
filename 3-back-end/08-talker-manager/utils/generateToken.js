const generateRandomString = () => Math.random().toString(36).substr(2);

const generateToken = () =>
  (generateRandomString() + generateRandomString()).substr(0, 16);

module.exports = generateToken;
