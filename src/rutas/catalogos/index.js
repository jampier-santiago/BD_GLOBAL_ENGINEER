// --- Dependencies ---
const express = require("express");
const router = express.Router();

const catalogosModel = require("../../modelos/catalogos")

module.exports = () => {
  // Get All catalogs
  router.get("/", (req, res) => {
    catalogosModel.getTodosLosCatalogos((error, data) => {
      res.status(200).json(data)
    })
  });

  // Get one catalog by id
  router.get("/:id", (req, res) => {
    const id = req.params.id;

    if(!isNaN(id)) {
      catalogosModel.getCatalogoPorId(id, (error, data) => {
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

  // Insert new Catalog
  router.post("/", (req, res) => {
    const data = {
      Id_Catalogo: req.body.Id_Catalogo,
      Catalogo: req.body.Catalogo,
      Nombre_Catalogo: req.body.Nombre_Catalogo
    }

    catalogosModel.insertCatalogo(data, (error, data) => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error});
      }
    })
  })

  // Update catalog
  router.put("/", (req, res) => {
    const data = {
      Id_Catalogo: req.body.Id_Catalogo,
      Catalogo: req.body.Catalogo,
      Nombre_Catalogo: req.body.Nombre_Catalogo
    }

    catalogosModel.updateCatalogo(data, (error, data) => {
      if(data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error: "Boo :("});
      }
    })
  })

  return router;
}