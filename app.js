const express = require("express");
const bodyParser = require("body-parser"), port = 3000;
const http = require("http"); 
const path = require("path"); 

const tipdoc = require("./src/rutas/TipDocRuta");
const app = express(); 

app.set("port", process.env.PORT || port);
app.use(bodyParser.json({ type: "application/json", limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); 

//================================================================

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use("/tipdoc", tipdoc());

http.createServer(app).listen(app.get("port"), () => {
  console.log(`Servidor Express escuchando por el puerto ${app.get("port")}`)
});

module.exports = app;
