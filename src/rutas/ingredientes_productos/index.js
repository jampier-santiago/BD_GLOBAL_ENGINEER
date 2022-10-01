// --- Dependencies ---
const express = require("express");
const router = express.Router();

const ingredientes_productosModel = require("../../modelos/ingredientes_productos");

module.exports = () => {
  // Get All data
  router.get("/", (req, res) => {
    ingredientes_productosModel.getAllIngredientes_productos((error, data) => {
      res.status(200).json(data);
    })
  });

  // Get by id
  router.get("/:id", (req, res) => {
    const id = req.params.id;

    if(!isNaN(id)) {
      ingredientes_productosModel.getIngredientes_productosById(id, (error, data) => {
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

  // Insert data
  router.post("/", (req, res) => {
    const data = {
      Id_ingredientes_productos: req.body.Id_ingredientes_productos,
      IProducto_ingredientes_productos: req.body.IProducto_ingredientes_productos,
      ingrediente_ingredientes_productos: req.body.ingrediente_ingredientes_productos,
      cantidad_ingredientes_productos: req.body.cantidad_ingredientes_productos,
    }

    ingredientes_productosModel.postInsertIngredientes_productos(data, (error, data) => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error});
      }
    });
  });

  // Update data
  router.put("/", (req, res) => {
    const data = {
      Id_ingredientes_productos: req.body.Id_ingredientes_productos,
      IProducto_ingredientes_productos: req.body.IProducto_ingredientes_productos,
      ingrediente_ingredientes_productos: req.body.ingrediente_ingredientes_productos,
      cantidad_ingredientes_productos: req.body.cantidad_ingredientes_productos,
    }

    ingredientes_productosModel.putUpdateInsertIngredientes_productos(data, (error, data) => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error});
      }
    });
  })

  return router;
}