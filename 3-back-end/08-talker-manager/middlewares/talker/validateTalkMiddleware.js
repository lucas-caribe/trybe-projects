const validateTalkMiddleware = (request, _response, next) => {
  const { talk } = request.body;

  if (!talk || talk.rate === undefined || !talk.watchedAt) {
    return next({
      status: 400,
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

module.exports = validateTalkMiddleware;
