const connection = require("../../conexion");

let ingredientes_productosModel = {};

// Get all data
ingredientes_productosModel.getAllIngredientes_productos = (callback) => {
  if(connection) {
    const sql = `SELECT Id_ingredientes_productos, 
    pro.Nombre_Producto AS IProducto_ingredientes_productos, 
     ing.Nombre_Ingrediente AS ingrediente_ingredientes_productos, 
     cantidad_ingredientes_productos
     FROM tp_ingredientes_productos inpr
     JOIN tb_ingredientes ing ON inpr.ingrediente_ingredientes_productos = ing.Id_Ingrediente
     JOIN tb_productos pro ON inpr.IProducto_ingredientes_productos = pro.Id_Producto;
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

// Get data by id
ingredientes_productosModel.getIngredientes_productosById = (id, callback) => {
  if(connection) {
    const sql = `SELECT Id_ingredientes_productos, 
    pro.Nombre_Producto AS IProducto_ingredientes_productos, 
     ing.Nombre_Ingrediente AS ingrediente_ingredientes_productos, 
     cantidad_ingredientes_productos
     FROM tp_ingredientes_productos inpr
     JOIN tb_ingredientes ing ON inpr.ingrediente_ingredientes_productos = ing.Id_Ingrediente
     JOIN tb_productos pro ON inpr.IProducto_ingredientes_productos = pro.Id_Producto 
     WHERE Id_ingredientes_productos = ${connection.escape(id)};`;

    connection.query(sql, (error, rows) => {
      if(error) {
        throw error;
      } else {
        callback(null, rows);
      }
    })
  }
}

// Insert data
ingredientes_productosModel.postInsertIngredientes_productos = (data, callback) => {
  if(connection) {
    const sql = `INSERT INTO tp_ingredientes_productos SET ?`;
    
    connection.query(sql, data, (error, result) => {
      if(error) {
        throw error;
      } else {
        callback(null, { "msg": "Registro insertado" });
      } 
    });
  }
};

// Update data
ingredientes_productosModel.putUpdateInsertIngredientes_productos = (data, callback) => {
  if(connection) {
    const sql = `
      UPDATE tp_ingredientes_productos SET IProducto_ingredientes_productos = ${connection.escape(data.IProducto_ingredientes_productos)}
      , ingrediente_ingredientes_productos = ${connection.escape(data.ingrediente_ingredientes_productos)}
      , cantidad_ingredientes_productos = ${connection.escape(data.cantidad_ingredientes_productos)}
       WHERE Id_ingredientes_productos = ${connection.escape(data.Id_ingredientes_productos)};
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
 
module.exports = ingredientes_productosModel;