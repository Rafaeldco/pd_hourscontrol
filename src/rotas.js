const express = require('express');
const { cadastrarSquad, listarHorasGastas, listarTempoTotal, listarMediaDeHoras } = require('./controladores/squad');
const { cadastrarUsuario } = require('./controladores/usuarios');
const { cadastrarReport } = require('./controladores/report');

const rotas = express();

rotas.post('/squad', cadastrarSquad);
rotas.post('/usuario', cadastrarUsuario);
rotas.post('/report', cadastrarReport);

rotas.get('/horas/:squad_id/:periodoInicio/:periodoFim', listarHorasGastas);
rotas.get('/total/:squad_id/:periodoInicio/:periodoFim', listarTempoTotal);
rotas.get('/media/:squad_id/:periodoInicio/:periodoFim', listarMediaDeHoras);

module.exports = rotas;