const express = require('express');

const router = express.Router();

const validateEmailMiddleware = require('../middlewares/auth/validateEmailMiddleware');
const validatePasswordMiddleware = require('../middlewares/auth/validatePasswordMiddleware');
const generateTokenMiddleware = require('../middlewares/auth/generateTokenMiddleware');

// requisito 3
router.post(
  '/',
  validateEmailMiddleware,
  validatePasswordMiddleware,
  generateTokenMiddleware,
);

module.exports = router;
