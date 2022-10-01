const connection = require("../../conexion");

let produccionesModel = {};

// Get all products
produccionesModel.getAllProducts = (callback) => {
  if(connection) {
    const sql = `SELECT Id_Producción, 
      Fecha_Produccion, 
      enc.Nom1_Encargado AS Nombre_encargado,
      enc.Apell1_Encargado AS Apellido_encargado,
      product.Nombre_Producto AS Nombre_Producto,
      num_totalProduccion,
      num_Defectuosos_Producción
      FROM th_produccion pro
      JOIN tb_encargados enc ON pro.Id_Empleado_Producción = enc.Id_Encargado
      JOIN tb_productos product ON pro.Id_Producto_Producción = product.Id_Producto;
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

// Get production by id
produccionesModel.getProductById = (id, callback) => {
  if(connection) {
    const sql = `SELECT Id_Producción, 
    Fecha_Produccion, 
    enc.Nom1_Encargado AS Nombre_encargado,
    enc.Apell1_Encargado AS Apellido_encargado,
    product.Nombre_Producto AS Nombre_Producto,
    num_totalProduccion,
    num_Defectuosos_Producción
    FROM th_produccion pro
    JOIN tb_encargados enc ON pro.Id_Empleado_Producción = enc.Id_Encargado
    JOIN tb_productos product ON pro.Id_Producto_Producción = product.Id_Producto
    WHERE Id_Producción = ${connection.escape(id)};`;

   connection.query(sql, (error, rows) => {
     if(error) {
       throw error;
     } else {
       callback(null, rows);
     }
   })
  }
};

// Insert production
produccionesModel.postInsertProduct = (data, callback) => {
  if(connection) {
    const sql = `INSERT INTO th_produccion SET ?`;
    
    connection.query(sql, data, (error, result) => {
      if(error) {
        throw error;
      } else {
        callback(null, { "msg": "Registro insertado" });
      } 
    })
  }
};

// Update production
produccionesModel.putUpdateProduction = (data, callback) => {
  if(connection) {
    const sql = `
      UPDATE th_produccion 
        SET Fecha_Produccion = ${connection.escape(data.Fecha_Produccion)}
      , Id_Empleado_Producción = ${connection.escape(data.Id_Empleado_Producción)}
      , Id_Producto_Producción = ${connection.escape(data.Id_Producto_Producción)}
      , num_totalProduccion = ${connection.escape(data.	num_totalProduccion)}
      , num_Defectuosos_Producción = ${connection.escape(data.	num_Defectuosos_Producción)}
       WHERE Id_Producción = ${connection.escape(data.Id_Producción)};
    `;

    connection.query(sql, (error, result) => {
      if(error) {
        throw error;
      } else {
        callback(null, {"msg": "Registro actualizado"});
      }
    });
  }
}

module.exports = produccionesModel;