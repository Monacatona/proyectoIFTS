const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3030;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "tasadoronline",
});

connection.connect();
app.get("/ciudades", (req, res) => {
  const consulta = "SELECT * FROM ciudad";

  connection.query(consulta, (error, resultados) => {
    if (error) throw error;
    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.send("No hay datos");
    }
  });
});
// trae todas las alturas

app.get("/ciudad-calles-alturas", (req, res) => {
  const consulta = "SELECT * FROM altura";

  connection.query(consulta, (error, resultados) => {
    if (error) throw error;
    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.send("No hay datos");
    }
  });
});
app.get("/ciudad-calle-altura/:ciudad/:calle/:altura", (req, res) => {
    const { ciudad, calle, altura } = req.params;
    /*res.send("calle " + calle + " altura " + altura);  */
    
  const consulta = `SELECT altura.precio_metro 
  FROM calle, altura, ciudad
  WHERE calle.id_calle = altura.id_calle
  AND calle.id_ciudad = ciudad.id_ciudad
  AND UPPER(ciudad.nombre) LIKE UPPER("%${ciudad}%")
  
  AND UPPER(calle.nombre) LIKE UPPER("%${calle}%") 
  AND ${altura} BETWEEN altura.altura_minima AND altura.altura_maxima
  `;

  connection.query(consulta, (error, resultados) => {
    if (error) throw error;
    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.send("No hay datos");
    }
  });
});
app.get('/banio/:cantidad', (req, res)=>{
  const {banio} = req.params;
    const consulta = `SELECT coef_banio FROM banio WHERE cantidad = ${cantidad}`
  connection.query(consulta, (error, resultados) => {
    if (error) throw error;
    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.send("No hay datos");
    }
  });
});
app.get('/cochera/:cantidad', (req, res)=>{
  const {cantidad} = req.params;
  const consulta = `SELECT coef_cochera FROM cochera WHERE cantidad = ${cantidad}`
  connection.query(consulta, (error, resultados) => {
    if (error) throw error;
    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.send("No hay datos");
    }
  });
});
app.get('/pileta/:cantidad', (req, res)=>{
  const {cantidad} = req.params;
  const consulta = `SELECT coef_pileta FROM pileta WHERE cantidad = ${cantidad}`
  connection.query(consulta, (error, resultados) => {
    if (error) throw error;
    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.send("No hay datos");
    }
  });
});
app.get('/jardin/:cantidad', (req, res)=>{
  const {cantidad} = req.params;
  const consulta = `SELECT coef_jardin FROM jardin WHERE cantidad = ${cantidad}`
  connection.query(consulta, (error, resultados) => {
    if (error) throw error;
    if (resultados.length > 0) {
      res.json(resultados);
    } else {
      res.send("No hay datos");
    }
  });
});


app.get("/ciudad/:id", (req, res) => {
  const { id } = req.params;

  const consulta = `SELECT * FROM ciudad WHERE id_Ciudad=${id}`;
  connection.query(consulta, (error, resultado) => {
    if (error) throw error;
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.send("No hay un ID que matchee con la base");
    }
  });
});
app.post("/ciudades", (req, res) => {
  const consulta = `INSERT INTO ciudad SET ?`;

  const customObject = {
    nombre: req.body.name,
  };

  connection.query(consulta, customObject, (error) => {
    if (error) throw error;
    res.send("Se insertó el registro!");
  });
});

app.put("/ciudad/:id", (req, res) => {
  const {id} = req.params;
  const {name} = req.body;

  const consulta = `UPDATE ciudad SET nombre="${name}" WHERE id_ciudad=${id}`;
  connection.query (consulta, (error) => {
    if (error) throw error;
    res.send("Se actualizó la tabla!");
  });
});

app.delete("/ciudad/:id", (req, res) => {
  const { id } = req.params;

  consulta = `DELETE FROM ciudad WHERE id_ciudad=${id}`;
  connection.query(consulta, (error) => {
    if (error) throw error;
    res.send("Se eliminó el registro");
  });
});

app.listen(PORT, () => {
  console.log(`La app está corriendo en el puerto ${PORT}`);
});
