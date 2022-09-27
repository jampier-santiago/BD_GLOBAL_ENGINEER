const connection = require("../../conexion");

let catalogosModel = {};

// Traer todos los catalogos
catalogosModel.getTodosLosCatalogos = (callback) => {
  if(connection) {
    const sql = `SELECT Id_Catalogo, Catalogo, Nombre_Catalogo FROM catalogo;`;
    
    connection.query(sql, (error, rows) => {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
}

// Traer un unico catalogo
catalogosModel.getCatalogoPorId = (id, callback) => {
  if(connection) {
    const sql = `SELECT Id_Catalogo, Catalogo, Nombre_Catalogo FROM catalogo WHERE Id_Catalogo = ${connection.escape(id)};`;

    connection.query(sql, (error, rows) => {
      if(error) {
        throw error;
      } else {
        callback(null, rows);
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
    const sql = `UPDATE catalogo SET Catalogo = ${connection.escape(data.Catalogo)},
     Nombre_Catalogo = ${connection.escape(data.Nombre_Catalogo)}
     WHERE Id_Catalogo = ${connection.escape(data.Id_Catalogo)};
    `;

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