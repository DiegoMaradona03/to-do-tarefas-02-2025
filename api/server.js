require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const usuarioRoutes = require('./src/routes/usuario.js');
const tarefaRoutes = require('./src/routes/tarefa.js');

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('API To-Do funcionando!');
});
app.use(usuarioRoutes);
app.use(tarefaRoutes);

app.listen(PORT,()=>{
    console.log('API respondendo em http://localhost:'+ PORT);
});