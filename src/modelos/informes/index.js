const connection = require("../../conexion");

var informesModel = {};

informesModel.informeProduccion = (id, dates, callback) => {
  if (connection) {
    const sql = `SELECT Id_produccion,
    DATE_FORMAT(Fecha_Produccion, '%Y-%m-%d') AS Fecha,
    enc.Nom1_Encargado AS Nombre_empleado,
    enc.Apell1_Encargado AS Apellido_empleado,
    prod.Nombre_Producto AS Nombre_producto,
    num_totalProduccion,
    num_Defectuosos_Produccion
    FROM th_produccion pro
    JOIN tb_productos prod ON pro.Id_Producto_Produccion = prod.Id_Producto
    JOIN tb_encargados enc ON pro.Id_Empleado_Produccion = enc.Id_Encargado
    WHERE pro.Fecha_Produccion BETWEEN ${connection.escape(dates.fecha_inicial)}
    AND ${connection.escape(
      dates.fecha_final
    )} && pro.Id_Empleado_Produccion = ${connection.escape(id)};
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

module.exports = informesModel;
