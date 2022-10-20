// --- Dependencies ---
const express = require("express");
const router = express.Router();

const productosModel = require("../../modelos/productos");

const rutasProductos = () => {
  // Get all products
  router.get("/", (req, res) => {
    productosModel.getTodosLosProductos((error, data) => {
      res.status(200).json(data)
    })
  });

  // Get product by id
  router.get("/:id", (req, res) => {
    const id = req.params.id;

    if(!isNaN(id)) {
      productosModel.getProductoPorId(id, (error, data) => {
        if(typeof data !== 'undefined' && data.length > 0) {
          res.status(200).json(data);
        } else {
          res.json(404, {"msg": "Registro no Existe"});
        }
      })
    } else {
      res.status(500).json({"msg": "error"})
    }
  })

  // Post insert product
  router.post("/", (req, res) => {
    const data = {
      Id_Producto: null,
      Nombre_Producto: req.body.Nombre_Producto,
      Peso_Producto: req.body.Peso_Producto,
      Dimensiones_Producto: req.body.Dimensiones_Producto,
      Tipo_producto: req.body.Tipo_producto,
      Estilo_Producto: req.body.Estilo_Producto
    }

    productosModel.postInsertarProductos(data, (error, data) => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error});
      }
    })
  });

  // PUT update product
  router.put("/", (req, res) => {
    const data = {
      Id_Producto: req.body.Id_Producto,
      Nombre_Producto: req.body.Nombre_Producto,
      Peso_Producto: req.body.Peso_Producto,
      Dimensiones_Producto: req.body.Dimensiones_Producto,
      Tipo_producto: req.body.Tipo_producto,
      Estilo_Producto: req.body.Estilo_Producto
    };

    productosModel.putUpdateProduct(data, (error, data) => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error});
      }
    })
  })

  return router;
};

module.exports = rutasProductos;