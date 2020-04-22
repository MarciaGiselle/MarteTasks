const express = require('express');
const conectarDatabase = require('./config/db')
const cors =  require('cors');
//crear el servidor
const app = express();

//conectar a la base de datos
conectarDatabase();
//app.use(cors());
app.use(
    cors({
      origin: '*'
    })
  );

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Credentials", true); 
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  });
//habilitar express.json
app.use(express.json({extended: true}));

// puerto de la app
const port = process.env.port || 4000;

//Importar rutas
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/materia', require('./routes/materia'));
app.use('/api/tarea', require('./routes/tarea'));


//definir la pagina principal
app.get('/', (request, response)=> {
    response.send('Hola')
})

//iniciar servidor
app.listen(port, '0.0.0.0',() => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})