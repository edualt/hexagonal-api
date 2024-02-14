const mysql = require('mysql');

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '290903',
  database: 'hapi'
});

// Conexión a MySQL
connection.connect(() => {
  console.log('DB MySQL is connected');
});
