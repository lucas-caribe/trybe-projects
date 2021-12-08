const express = require('express');

const router = express.Router();

const getTalkers = require('../utils/getTalkers');
const getTalkerById = require('../utils/getTalkerById');

const validateTokenMiddleware = require('../middlewares/talker/validateTokenMiddleware');
const validateNameMiddleware = require('../middlewares/talker/validateNameMiddleware');
const validateAgeMiddleware = require('../middlewares/talker/validateAgeMiddleware');
const validateTalkMiddleware = require('../middlewares/talker/validateTalkMiddleware');
const validateRateMiddleware = require('../middlewares/talker/validateRateMiddleware');
const validateDateMiddleware = require('../middlewares/talker/validateDateMiddleware');
const validateSearchMiddleware = require('../middlewares/talker/validateSearchMiddleware');

const createTalkerMiddleware = require('../middlewares/talker/createTalkerMiddleware');
const updateTalkerMiddleware = require('../middlewares/talker/updateTalkerMiddleware');
const deleteTalkerMiddleware = require('../middlewares/talker/deleteTalkerMiddleware');

// requisito 1
router.get('/', (_request, response) => {
  const talkers = getTalkers();

  return response.status(200).json(talkers);
});

// requisito 7
router.get('/search', validateTokenMiddleware, validateSearchMiddleware);

// requisito 2
router.get('/:id', (request, response) => {
  const { id } = request.params;
  const talk = getTalkerById(id);

  if (talk) {
    return response.status(200).json(talk);
  }

  return response.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

// requisito 4
router.post(
  '/',
  validateTokenMiddleware,
  validateNameMiddleware,
  validateAgeMiddleware,
  validateTalkMiddleware,
  validateRateMiddleware,
  validateDateMiddleware,
  createTalkerMiddleware,
);

// requisito 5
router.put(
  '/:id',
  validateTokenMiddleware,
  validateNameMiddleware,
  validateAgeMiddleware,
  validateTalkMiddleware,
  validateRateMiddleware,
  validateDateMiddleware,
  updateTalkerMiddleware,
);

// requisito 6
router.delete('/:id', validateTokenMiddleware, deleteTalkerMiddleware);

module.exports = router;
