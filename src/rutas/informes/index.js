// --- Dependencies ---
const express = require("express");
const router = express.Router();

const informesModel = require("../../modelos/informes");

module.exports = () => {
  router.get("/", (req, res) => {
    const dates = {
      fecha_inicial: req.body.fecha_inicial,
      fecha_final: req.body.fecha_final,
    }

    informesModel.informeProduccion(dates, (error, data) => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error});
      }
    })
  })

  return router;
};
