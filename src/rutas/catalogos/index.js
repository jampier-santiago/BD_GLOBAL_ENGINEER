// --- Dependencies ---
const express = require("express");
const router = express.Router();

const catalogosModel = require("../../modelos/catalogos")

module.exports = () => {
  router.get("/", (req, res) => {
    catalogosModel.getTodosLosCatalogos((error, data) => {
      res.status(200).json(data)
    })
  });

  router.post("/", (req, res) => {
    const data = {
      Id_Catalogo: null
    }

    catalogosModel.insertCatalogo(() => {

    })
  })

  return router;
}