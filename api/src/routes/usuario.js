const express = require('express');
const routes = express.Router();

const Usuario = require('../controllers/usuario');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'To do' });
});

routes.post('/usuarios', Usuario.create);
routes.get('/usuarios', Usuario.read);
routes.get('/usuarios/:id', Usuario.readOne);
routes.patch('/usuarios/:id', Usuario.update);
routes.delete('/usuarios/:id', Usuario.remove);

module.exports = routes;