const connection = require("../../conexion");

var contactosModel = {};

contactosModel.getTodasLosContactos = () => {
  if(connection) {
    const sql = ``;
    
    connection.query(sql, (error, rows) => {
      if (error) {
        throw error;
      } else {
        callback(rows);
      }
    });
  }
}

contactosModel.getUnContacto = (id, callback) => {
  if(connection) {
    const sql = ``;

    connection.query(sql, (error, rows) => {
      if (error) {
        throw error;
      } else {
        callback(rows);
      }
    });
  }
}

contactosModel.putActualizarContacto = (contactoData, callback) => {
  if(connection) {
    const sql = ``;

    connection.query(sql, (error, rows) => {
      if (error) {
        throw error;
      } else {
        callback(null, {"msg": "Registro actualizado"});      }
    });
  }
}

contactosModel.postInsertarContacto = (contactoData, callback) => {
  if(connection) {
    const sql = ``;

    connection.query(sql, contactoData, (error, result) => {
      if (error) {
        throw error;
      } else {
        callback(null, { "msg": "Registro insertado" });
      }
    });
  }
}

module.exports = contactosModel;