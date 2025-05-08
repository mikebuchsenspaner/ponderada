const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
const compromissosRoutes = require('./routes/compromissos');
app.use('/compromissos', compromissosRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});


