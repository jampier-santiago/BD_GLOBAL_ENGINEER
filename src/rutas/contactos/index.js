const express = require("express");
const router = express.Router();

const contactosModel = require("../../modelos/contactos");

module.exports = () => {
  // Get all contacts
  router.get("/", (req, res) => {
    contactosModel.getTodosLosContactos((data) => {
      res.status(200).json(data)
    })
  });

  // Get contact by id
  router.get("/:id", (req, res) => {
    const id = req.params.id;

    if(!isNaN(id)) {
      contactosModel.getContactoById(id, (  data) => {
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

  // Insert contacts
  router.post("/", (req, res) => {
    const data = {
      Id_Contactos: req.body.Id_Contactos,
      Dato_Contacto: req.body.Dato_Contacto,
      Encargado_Contacto: req.body.Encargado_Contacto,
      Tipo_Contacto: req.body.Tipo_Contacto
    };

    contactosModel.postInsertarContacto(data, (error, data) => {
      if(data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error});
      }
    });
  })

  // Update contact
  router.put("/", (req, res) => {
    const data = {
      Id_Contactos: req.body.Id_Contactos,
      Dato_Contacto: req.body.Dato_Contacto,
      Encargado_Contacto: req.body.Encargado_Contacto,
      Tipo_Contacto: req.body.Tipo_Contacto,
    }

    contactosModel.putActualizarContacto(data, (error, data) => {
      if(data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({error: "Boo :("});
      }
    })
  });
    

  return router;
}