var mysql = require("mysql");
var settings = require("../conexion/config.json");

var connection;

const connectDatabase  = () => {
  if (!connection) {
    connection = mysql.createConnection(settings);

    connection.connect((err) => {
      console.log(!err ? "Base de Datos Conectada" : "Error en la conexión con la Base de Datos")
    });
  }

  return connection;
}

module.exports = connectDatabase();
