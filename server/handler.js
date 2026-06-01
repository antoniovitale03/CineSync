const serverless = require('serverless-http');
const app = require('./server'); // Importa il file sopra

// Questo è il punto di ingresso richiesto da AWS Lambda
module.exports.handler = serverless(app);