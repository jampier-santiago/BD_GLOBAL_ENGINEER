// --- Dependencies ---
const express = require("express");
const router = express.Router();

const produccionesModel = require("../../modelos/producciones"); 

const rutasProducciones = () => {
  // Get all productions
  router.get("/", (req, res) => {
    produccionesModel.getAllProducts((error, data) => {
      res.status(200).json(data);
    })
  });

  // Get production by id
  router.get("/:id", (req, res) => {
    const id = req.params.id;

    if(!isNaN(id)) {
      produccionesModel.getProductById(id, (error, data) => {
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

  // POST Inser product
  router.post("/", (req, res) => {
    const data = {
      Id_Producción: null,
      Fecha_Produccion: req.body.Fecha_Produccion,
      Id_Empleado_Producción: req.body.Id_Empleado_Producción,
      Id_Producto_Producción: req.body.Id_Producto_Producción,
      num_totalProduccion: req.body.num_totalProduccion,
      num_Defectuosos_Producción: req.body.num_Defectuosos_Producción,
    };

    produccionesModel.postInsertProduct(data, (error, data) => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error});
      }
    });
  });

  // PUT update production
  router.put("/", (req, res) => {
    const data = {
      Id_Producción: req.body.Id_Producción,
      Fecha_Produccion: req.body.Fecha_Produccion,
      Id_Empleado_Producción: req.body.Id_Empleado_Producción,
      Id_Producto_Producción: req.body.Id_Producto_Producción,
      num_totalProduccion: req.body.num_totalProduccion,
      num_Defectuosos_Producción: req.body.num_Defectuosos_Producción,
    };

    produccionesModel.putUpdateProduction(data, (error, data) => {
      if(data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error: "Boo :("});
      }
    })
  })

  return router;
};

module.exports = rutasProducciones;