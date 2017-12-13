const http = require('http');
//añade ./app porque busca el fichero app.js que esta en el mismo dir
const app = require('./app');

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port);
