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

    try {
      const res = await Customer.find({ name: /^M/i }).select('name age');
      console.log('Documentos encontrados');
      console.log(res);
    } catch (err) {
      console.error('Error al encontrar los documentos', err);
    }
    
    mongoose.connection.close();
    })
    .catch(err => console.error('Error al conectarse a MongoDB', err));
