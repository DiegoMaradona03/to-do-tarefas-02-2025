const express = require('express');
const routes = express.Router();

const Tarefa = require('../controllers/tarefa.js');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'To do' });
});

routes.post('/tarefas', Tarefa.create);
routes.get('/tarefas', Tarefa.read);
routes.get('/tarefas/:id', Tarefa.readOne);
routes.patch('/tarefas/:id', Tarefa.update);
routes.delete('/tarefas/:id', Tarefa.remove);

module.exports = routes;