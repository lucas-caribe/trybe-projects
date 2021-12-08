const express = require('express');
const bodyParser = require('body-parser');

const talkerRoutes = require('./routes/talkerRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRoutes);
app.use('/login', loginRoutes);

// middleware de erro
app.use((error, _request, response, _next) =>
  response.status(error.status).json({ message: error.message }));

app.listen(PORT, () => {
  console.log('Online');
});
