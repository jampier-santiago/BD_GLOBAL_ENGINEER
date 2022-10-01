const connection = require("../../conexion");

var contactosModel = {};

// Get all contacts
contactosModel.getTodosLosContactos = (callback) => {
  if(connection) {
    const sql = `SELECT Id_Contactos, 
    Dato_Contacto, 
    Encargado_Contacto, 
    cat.Nombre_Catalogo AS Tipo_Contacto,
    enc.Nom1_Encargado AS Nombre_contacto,
    enc.Apell1_Encargado AS Apellido_Contacto
     FROM am_contactos con
     JOIN ct_catalogo cat ON con.Tipo_Contacto = cat.Id_Catalogo
     JOIN tb_encargados enc ON con.Tipo_Contacto = enc.Id_Encargado;
    `;
    
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
    const sql = `SELECT Id_Contactos, 
     Dato_Contacto, 
     Encargado_Contacto, 
     cat.Nombre_Catalogo AS Tipo_Contacto,
     enc.Nom1_Encargado AS Nombre_contacto,
     enc.Apell1_Encargado AS Apellido_Contacto
     FROM am_contactos con
     JOIN ct_catalogo cat ON con.Tipo_Contacto = cat.Id_Catalogo 
     JOIN tb_encargados enc ON con.Encargado_Contacto = enc.Id_Encargado 
     AND Id_Contactos = ${connection.escape(id)};`;

    connection.query(sql, (error, rows) => {
      if (error) {
        throw error;
      } else {
        callback(rows);
      }
    });
  }
}

contactosModel.putActualizarContacto = (data, callback) => {
  if(connection) {
    const sql = `UPDATE am_contactos 
     SET Dato_Contacto = ${connection.escape(data.Dato_Contacto)}
     , Encargado_Contacto = ${connection.escape(data.Encargado_Contacto)}
     , Tipo_Contacto = ${connection.escape(data.Tipo_Contacto)}
     WHERE Id_Contactos = ${connection.escape(data.Id_Contactos)}
    `; 

    connection.query(sql, (error, rows) => {
      if (error) {
        throw error;
      } else {
        callback(null, {"msg": "Registro actualizado"});
      }
    });
  }
}

// Inset contacts
contactosModel.postInsertarContacto = (contactoData, callback) => {
  if(connection) {
    const sql = `INSERT INTO am_contactos SET ?`;

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