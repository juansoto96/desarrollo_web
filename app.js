const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

// Configuración de conexión a la base de datos
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Jero2109.', // Cambia si tu usuario tiene contraseña
  database: 'desarrollo_web',
});

// Endpoint raíz
app.get('/', (req, res) => {
  res.send('¡Hola, Mundo!');
});

// Endpoint para login
app.get('/login', async (req, res) => {
  const { usuario, clave } = req.query;

  // Verifica si se pasaron los parámetros requeridos
  if (!usuario || !clave) {
    return res.status(400).send('Faltan parámetros: usuario y/o clave');
  }

  try {
    // Consulta a la base de datos
    const [results] = await connection.query(
      'SELECT * FROM `usuarios` WHERE `usuario` = ? AND `clave` = ?',
      [usuario, clave]
    );

    // Valida el resultado de la consulta
    if (results.length > 0) {
      res.status(200).send('Inicio de sesión correcto');
    } else {
      res.status(401).send('Datos incorrectos');
    }
  } catch (err) {
    console.error('Error en la base de datos:', err.message);
    res.status(500).send('Error interno del servidor');
  }
});

// Endpoint para validar sesión
app.get('/validar', (req, res) => {
  res.send('Sesión validada');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Aplicación ejecutándose en http://localhost:${port}`);
});
