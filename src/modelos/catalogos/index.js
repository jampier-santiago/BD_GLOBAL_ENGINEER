const connection = require("../../conexion");

let catalogosModel = {};

// Traer todos los catalogos
catalogosModel.getTodosLosCatalogos = (callback) => {
  if(connection) {
    const sql = `SELECT Id_Catalogo, 
     Nombre_Catalogo, 
     Tipo_Catalogo 
     FROM ct_catalogo;`;
    
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
    const sql = `SELECT Id_Catalogo, 
     Nombre_Catalogo, 
     Tipo_Catalogo 
     FROM ct_catalogo 
     WHERE Id_Catalogo = ${connection.escape(id)};`;

    connection.query(sql, (error, rows) => {
      if(error) {
        throw error;
      } else {
        callback(rows);
      }
    })
  }
}

// Insertar un catalogo
catalogosModel.postCatalogo = (data, callback) => {
  if(connection) {
    const sql = `INSERT INTO ct_catalogo SET ?`;
    
    connection.query(sql, data, (error, result) => {
      if(error) {
        throw error;
      } else {
        callback(null, { "msg": "Registro insertado" });
      } 
    });
  }
}

// Actualizar registro
catalogosModel.putCatalogo = (data, callback) => {
  if(connection) {
    const sql = `
      UPDATE ct_catalogo SET Tipo_Catalogo = ${connection.escape(data.Tipo_Catalogo)},
      Nombre_Catalogo = ${connection.escape(data.Nombre_Catalogo)}
      WHERE Id_Catalogo = ${connection.escape(data.Id_Catalogo)};
    `;

    connection.query(sql, (error, result) => {
      if(error) {
        throw error;
      } else {
        callback({"msg": "Registro actualizado"});
      }
    });
  }
}


// Consultar catalogos por sus tipos
catalogosModel.getCatalogoPorTipo = (tipo, callback) => {
  if(connection) {
    const sql = `SELECT Id_Catalogo, 
     Nombre_Catalogo 
     FROM ct_catalogo 
     WHERE Tipo_Catalogo = ${connection.escape(tipo)};`;

     connection.query(sql, (error, rows) => {
      if(error) {
        throw error;
      } else {
        callback(rows);
      }
     })
  }
}

module.exports = catalogosModel