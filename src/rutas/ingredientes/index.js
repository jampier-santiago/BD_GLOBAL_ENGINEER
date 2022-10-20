// --- Dependencies ---
const express = require("express");
const router = express.Router();

const ingredientesModel = require("../../modelos/ingredientes");

module.exports = () => {
  // Get all materiales
  router.get("/", (req, res) => {
    ingredientesModel.getAllIngredients((error, data) => {
      res.status(200).json(data);
    })
  });

  // Get product by id
  router.get("/:id", (req, res) => {
    const id = req.params.id;

    if(!isNaN(id)) {
      ingredientesModel.getIngredientById(id, (error, data) => {
        if(typeof data !== 'undefined' && data.length > 0) {
          res.status(200).json(data);
        } else {
          res.json(404, {"msg": "Registro no Existe"});
        }
      })
    } else {
      res.status(500).json({"msg": "error"})
    }
  });

  // Insert ingredient
  router.post("/", (req, res) => {
    const data = {
      Id_Ingrediente: null,
      Nombre_Ingrediente: req.body.Nombre_Ingrediente,
      Proveedor_Ingrediente: req.body.Proveedor_Ingrediente,
      tel_Proveedor_Ingrediente: req.body.tel_Proveedor_Ingrediente,
      Uso_Ingrediente: req.body.Uso_Ingrediente,
      Tipo_Ingrediente: req.body.Tipo_Ingrediente,
    }

    ingredientesModel.postInsertarIngredientes(data, (error, data) => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error});
      }
    })
  });

  // Update ingredient
  router.put("/", (req, res) => {
    const data = {
      Id_Ingrediente: req.body.Id_Ingrediente,
      Nombre_Ingrediente: req.body.Nombre_Ingrediente,
      Proveedor_Ingrediente: req.body.Proveedor_Ingrediente,
      tel_Proveedor_Ingrediente: req.body.tel_Proveedor_Ingrediente,
      Uso_Ingrediente: req.body.Uso_Ingrediente,
      Tipo_Ingrediente: req.body.Tipo_Ingrediente,
    }

    ingredientesModel.putUpdateMaterial(data, (error, data) => {
      if(data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error: "Boo :("});
      }
    })
  })

  return router;
}