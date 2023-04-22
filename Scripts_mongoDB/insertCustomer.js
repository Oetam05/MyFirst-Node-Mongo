const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const user=process.env.USER
const password=process.env.PASSWORD
const url = 'mongodb+srv://'+user+':'+password+'@cluster0.jbvet7u.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Conectado a MongoDB');

    const schema = new mongoose.Schema({
      name: String,
      age: Number
    });
    const Customer = mongoose.model('Customer', schema, 'customers');

    const customers =[
      { name: 'Miguel Altamar', age: 33 },
      { name: 'Mateo Aristizabal', age: 22 },
      { name: 'Mateo Anaya', age: 27 }
    ]
    try {
      await Customer.insertMany(customers);
      console.log('Datos insertados');
    } catch (err) {
      console.error('Error al insertar el documento', err);
    }

    mongoose.connection.close();
  })
  .catch(err => console.error('Error al conectarse a MongoDB', err));
