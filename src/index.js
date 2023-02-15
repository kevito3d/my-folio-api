const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

//app de express
const app = express();

//db config
const {connectDB} = require('./config/conecctionDb');
connectDB();



//Configuración de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//middleware
// cors
app.use(cors());
// morgan dev
app.use(require("morgan")("dev"));

//Rutas
app.use("/api/user", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/project", require("./routes/project.route"));

//Servidor
app.listen(process.env.PORT || 3000
  , () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
