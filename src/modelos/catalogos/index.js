const connection = require("../../conexion");

let catalogosModel = {};

// Traer todos los catalogos
catalogosModel.getTodosLosCatalogos = (callback) => {
  if(connection) {
    const sql = `SELECT * FROM catalogo`;
    
    connection.query(sql, (error, rows) => {
      if(error) {
        throw error;
      } else {
        callback(rows);
      }
    })
  }
}

// Traer un unico catalogo
catalogosModel.getCatalogoPorId = (id, callback) => {
  if(connection) {
    const sql = `SELECT * FROM catalogo WHERE Id_Catalogo = ${connection.escape(id)}`;

    connection.query(sql, (error, rows) => {
      if(error) {
        throw error;
      } else {
        callback(null);
      }
    })
  }
}

// Insertar un catalogo
catalogosModel.insertCatalogo = (data, callback) => {
  if(connection) {
    const sql = `INSERT INTO catalogo SET ?`;
    
    connection.query(sql, data, (error, result) => {
      if(error) {
        throw error;
      } else {
        callback(null, { "msg": "Registro insertado" });
      } 
    })
  }
}

// Actualizar registro
catalogosModel.updateCatalogo = (data, callback) => {
  if(connection) {
    const sql = ``;

    connection.query(sql, () => {
      if(error) {
        throw error;
      } else {
        callback(null, {"msg": "Registro actualizado"});
      }
    });
  }
}

module.exports = catalogosModel