// --- Dependencies ---
const express = require("express");
const router = express.Router();

const informesModel = require("../../modelos/informes");

module.exports = () => {
  router.get("/:startDate/:finishDate/:id", (req, res) => {
    const dates = {
      fecha_inicial: req.params.startDate,
      fecha_final: req.params.finishDate,
    };

    const id = req.params.id;

    informesModel.informeProduccion(id, dates, (error, data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error });
      }
    });
  });

  return router;
};
