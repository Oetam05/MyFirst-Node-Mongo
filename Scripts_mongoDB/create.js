const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const user=process.env.USER
const password=process.env.PASSWORD
const url = 'mongodb+srv://'+user+':'+password+'@cluster0.jbvet7u.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');

    // Crear una nueva base de datos
    const db = mongoose.connection.db;
    db.createCollection('customers', function(err, res) {
      if (err) throw err;
      console.log('Base de datos creada');
      mongoose.connection.close();
    });
  })
  .catch(err => console.error('Error al conectarse a MongoDB', err));
