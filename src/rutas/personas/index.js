// --- Dependencies ---
const express = require("express");
const router = express.Router();

const personasModel = require("../../modelos/personas");

const rutasPersonas = () => {
  // Get all persons
  router.get("/", (req, res) => {
    personasModel.getTodasLasPersonas((error, data) => {
      res.status(200).json(data)
    });
  })

  // Inset person
  router.post("/", (req, res) => {
    const data = {
      Id_Encargado: req.body.Id_Encargado,
      Nom1_Encargado: req.body.Nom1_Encargado,
      Nom2_Encargado: req.body.Nom2_Encargado,
      Apell1_Encargado: req.body.Apell1_Encargado,
      Apell2_Encargado: req.body.Apell2_Encargado,
      Sexo_Encargado: req.body.Sexo_Encargado,
      FechaNacimiento_Encargado: req.body.FechaNacimiento_Encargado,
      Tip_Doc_Encargado: req.body.Tip_Doc_Encargado,
      num_Doc_Encargado: req.body.num_Doc_Encargado,
      Rol_Encargado: req.body.Rol_Encargado,
    };

    personasModel.postInsertarPersona(data, (error, data) => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error});
      }
    })
  })

  // Get person by id
  router.get("/:id", (req, res) => {
    const id = req.params.id;

    if(!isNaN(id)) {
      personasModel.getPersonaPorId(id, (error, data) => {
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

  // Put person
  router.put("/", (req, res) => {
    const data = {
      Id_Encargado: req.body.Id_Encargado,
      Nom1_Encargado: req.body.Nom1_Encargado,
      Nom2_Encargado: req.body.Nom2_Encargado,
      Apell1_Encargado: req.body.Apell1_Encargado,
      Apell2_Encargado: req.body.Apell2_Encargado,
      Sexo_Encargado: req.body.Sexo_Encargado,
      FechaNacimiento_Encargado: req.body.FechaNacimiento_Encargado,
      Tip_Doc_Encargado: req.body.Tip_Doc_Encargado,
      num_Doc_Encargado: req.body.num_Doc_Encargado,
      Rol_Encargado: req.body.Rol_Encargado,
    };

    personasModel.putActualizarPersona(data, (error, data) => {
      if(data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error});
      }
    });
  });

  return router;
};

module.exports = rutasPersonas;