const connection = require("../../conexion");

let productosModel = {};

// Get all products
productosModel.getTodosLosProductos = (callback) => {
  if(connection) {
    const sql = `SELECT Id_Producto, 
     Nombre_Producto, 
     Peso_Producto, 
     Dimensiones_Producto, 
     cat.Nombre_Catalogo AS Tipo_producto, 
     catalogo.Nombre_Catalogo AS Estilo_Producto 
     FROM tb_productos as pro
     JOIN ct_catalogo cat ON pro.Tipo_producto = cat.Id_Catalogo
     JOIN ct_catalogo catalogo ON pro.Estilo_Producto = catalogo.Id_Catalogo;
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

// Get product by id
productosModel.getProductoPorId = (id, callback) => {
  if(connection) {
    const sql = `SELECT Id_Producto, 
     Nombre_Producto, 
     Peso_Producto, 
     Dimensiones_Producto, 
     cat.Nombre_Catalogo AS Tipo_producto, 
     catalogo.Nombre_Catalogo AS Estilo_Producto 
     FROM tb_productos as pro
     JOIN ct_catalogo cat ON pro.Tipo_producto = cat.Id_Catalogo
     JOIN ct_catalogo catalogo ON pro.Estilo_Producto = catalogo.Id_Catalogo
     WHERE Id_Producto = ${id};
    `;

    connection.query(sql, (error, rows) => {
      if(error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

// --- POST insert product ---
productosModel.postInsertarProductos = (data, callback) => {
  if(connection) {
    const sql = "INSERT INTO tb_productos SET ?";

    connection.query(sql, data, (error, result) => {
      if(error) {
        throw error;
      } else {
        callback(null, { "msg": "Registro insertado" });
      }
    });
  }
};

// --- UPDATE product
productosModel.putUpdateProduct = (data, callback) => {
  if(connection) {
    const sql = `
    UPDATE tb_productos 
    SET Nombre_Producto = ${connection.escape(data.Nombre_Producto)}
    , Peso_Producto = ${connection.escape(data.Peso_Producto)}
    , Dimensiones_Producto = ${connection.escape(data.Dimensiones_Producto)}
    , Tipo_producto = ${connection.escape(data.Tipo_producto)}
    , Estilo_Producto = ${connection.escape(data.Estilo_Producto)}
     WHERE Id_Producto = ${connection.escape(data.Id_Producto)};
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

module.exports = productosModel;