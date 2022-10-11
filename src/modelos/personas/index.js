const connection = require("../../conexion");

var personasModel = {};

// Get all persons
personasModel.getTodasLasPersonas = (callback) => {
  if(connection) {
    const sql = `SELECT e.Id_Encargado, 
     Nom1_Encargado, Nom2_Encargado, 
     Apell1_Encargado, 
     Apell2_Encargado, 
     Sexo_Encargado, 
     DATE_FORMAT(FechaNacimiento_Encargado, '%Y-%m-%d') AS FechaNacimiento_Encargado,
     d.Nombre_Catalogo as TIPO_identificacion, 
     num_Doc_Encargado, 
     c.Nombre_Catalogo as Rol_encargado 
     FROM tb_encargados as e 
     JOIN ct_catalogo d ON e.Tip_Doc_Encargado = d.Id_Catalogo 
     JOIN ct_catalogo c ON e.Rol_Encargado = c.Id_Catalogo;`;

    connection.query(sql, (error, rows) => {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  };
}

// Get person by id
personasModel.getPersonaPorId = (id, callback) => {
  if(connection) {
    const sql = `SELECT e.Id_Encargado, 
     Nom1_Encargado, 
     Nom2_Encargado, 
     Apell1_Encargado, 
     Apell2_Encargado, 
     Sexo_Encargado, 
     DATE_FORMAT(FechaNacimiento_Encargado, '%Y-%m-%d') AS FechaNacimiento_Encargado,
     d.Nombre_Catalogo as Tip_Doc_Encargado, 
     num_Doc_Encargado, 
     c.Nombre_Catalogo as Rol_Encargado 
     FROM tb_encargados as e 
     JOIN ct_catalogo d ON e.Tip_Doc_Encargado = d.Id_Catalogo 
     JOIN ct_catalogo c ON e.Rol_Encargado = c.Id_Catalogo
     AND Id_Encargado = ${connection.escape(id)};`;
  
    connection.query(sql, (error, rows) => {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
}

// Insert person
personasModel.postInsertarPersona = (data, callback) => {
  if(connection) {
    const sql = `INSERT INTO tb_encargados SET ?`;

    connection.query(sql, data, (error, result) => {
      if(error) {
        throw error;
      } else {
        callback(null, { "msg": "Registro insertado" });
      } 
    })
  }
}

// Update person
personasModel.putActualizarPersona = (data, callback) => {
  if(connection) {
    const sql = "UPDATE tb_encargados SET Nom1_Encargado = " + connection.escape(data.Nom1_Encargado)
      + " , Nom2_Encargado = " + connection.escape(data.Nom2_Encargado)
      + " , Apell1_Encargado = " + connection.escape(data.Apell1_Encargado)
      + " , Apell2_Encargado = " + connection.escape(data.Apell2_Encargado)
      + " , Sexo_Encargado = " + connection.escape(data.Sexo_Encargado)
      + " , FechaNacimiento_Encargado = " + connection.escape(data.FechaNacimiento_Encargado)
      + " , Tip_Doc_Encargado = " + connection.escape(data.Tip_Doc_Encargado)
      + " , num_Doc_Encargado = " + connection.escape(data.num_Doc_Encargado)
      + " , Rol_Encargado = " + connection.escape(data.Rol_Encargado)
      + " WHERE Id_Encargado = " + connection.escape(data.Id_Encargado) + ";";

    connection.query(sql, (error, rows) => {
      if (error) {
        throw error;
      } else {
        callback(null, {"msg": "Registro actualizado"});
      }
    });
  }
};

module.exports = personasModel;