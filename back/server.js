require('dotenv').config();
const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const atividadesRoutes = require('./src/routes/atividades.routes');

app.use('/atividades', atividadesRoutes);


const professoresRoutes = require('./src/routes/professores.routes');

app.use('/professores', professoresRoutes);


const turmasRoutes = require('./src/routes/turmas.routes');

app.use('/turmas', turmasRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
