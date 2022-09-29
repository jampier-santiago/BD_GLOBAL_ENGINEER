const connection = require("../../conexion");

var personasModel = {};

// Get all persons
personasModel.getTodasLasPersonas = (callback) => {
  if(connection) {
    const sql = `SELECT Id_Encargado, Nom1_Encargado, Nom2_Encargado, Apell1_Encargado , Apell2_Encargado, Sexo_Encargado, FechaNacimiento_Encargado, Nombre_Catalogo as Tip_Doc_Encargado, num_Doc_Encargado, Rol_Encargado FROM tb_encargados JOIN ct_catalogo ON tb_encargados.Tip_Doc_Encargado = ct_catalogo.Id_Catalogo;`;

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
    const sql = `SELECT Id_Encargado, Nom1_Encargado, Nom2_Encargado, Apell1_Encargado , Apell2_Encargado, Sexo_Encargado, FechaNacimiento_Encargado, Nombre_Catalogo as Tip_Doc_Encargado, num_Doc_Encargado, Rol_Encargado FROM tb_encargados JOIN ct_catalogo ON tb_encargados.Tip_Doc_Encargado = ct_catalogo.Id_Catalogo AND Id_Encargado = ${connection.escape(id)};`;
  
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