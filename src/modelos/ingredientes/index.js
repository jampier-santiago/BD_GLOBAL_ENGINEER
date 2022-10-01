const connection = require("../../conexion");

let ingredientesModel = {};

// Get all ingredients
ingredientesModel.getAllIngredients = (callback) => {
  if(connection) {
    const sql = `SELECT Id_Ingrediente, 
     Nombre_Ingrediente, 
     Proveedor_Ingrediente, 
     tel_Proveedor_Ingrediente, 
     catalogo.Nombre_Catalogo AS Uso_Ingrediente,
     cat.Nombre_Catalogo AS Tipo_Ingrediente
     FROM tb_ingredientes ing
     JOIN ct_catalogo cat ON ing.Tipo_Ingrediente = cat.Id_Catalogo
     JOIN ct_catalogo catalogo ON ing.Uso_Ingrediente = catalogo.Id_Catalogo;
    `;
   
   connection.query(sql, (error, rows) => {
     if (error) {
       throw error;
     } else {
       callback(null, rows);
     }
   });
  }
};

// Get ingredient by id
ingredientesModel.getIngredientById = (id, callback) => {
  if(connection) {
    const sql = `SELECT Id_Ingrediente, 
    Nombre_Ingrediente, 
    Proveedor_Ingrediente, 
    tel_Proveedor_Ingrediente, 
    catalogo.Nombre_Catalogo AS Uso_Ingrediente,
    cat.Nombre_Catalogo AS Tipo_Ingrediente
    FROM tb_ingredientes ing
    JOIN ct_catalogo cat ON ing.Tipo_Ingrediente = cat.Id_Catalogo
    JOIN ct_catalogo catalogo ON ing.Uso_Ingrediente = catalogo.Id_Catalogo
     WHERE Id_Ingrediente = ${id};`;
   
   connection.query(sql, (error, rows) => {
     if (error) {
       throw error;
     } else {
       callback(null, rows);
     }
   });
  }
}

// Update ingredient
ingredientesModel.putUpdateMaterial = (data, callback) => {
  if(connection) {
    const sql = `
      UPDATE tb_ingredientes SET Nombre_Ingrediente = ${connection.escape(data.Nombre_Ingrediente)}
      , Proveedor_Ingrediente  = ${connection.escape(data.Proveedor_Ingrediente )}
      , tel_Proveedor_Ingrediente = ${connection.escape(data.tel_Proveedor_Ingrediente)}
      , Uso_Ingrediente = ${connection.escape(data.Uso_Ingrediente)}
      , Tipo_Ingrediente = ${connection.escape(data.Tipo_Ingrediente)}
       WHERE Id_Ingrediente = ${connection.escape(data.Id_Ingrediente)};
    `;

    connection.query(sql, (error, result) => {
      if(error) {
        throw error;
      } else {
        callback(null, {"msg": "Registro actualizado"});
      }
    });
  }
};

// Insert ingredients
ingredientesModel.postInsertarIngredientes = (data, callback) => {
  if(connection) {
    const sql = `INSERT INTO tb_ingredientes SET ?`;
    
    connection.query(sql, data, (error, result) => {
      if(error) {
        throw error;
      } else {
        callback(null, { "msg": "Registro insertado" });
      } 
    });
  }
}

module.exports = ingredientesModel;