const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const user=process.env.USER
const password=process.env.PASSWORD
const url = 'mongodb+srv://'+user+':'+password+'@cluster0.jbvet7u.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Conectado a MongoDB');

    const orderSchema = new mongoose.Schema({
      product: String,
      quantity: Number,
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
    });
    const Order = mongoose.model('Order', orderSchema, 'orders');

    const orders = [
      { product: 'Product 33', quantity: 2, customerId: '644307fb41f014953baa246b' },
      { product: 'Product 2', quantity: 1, customerId: '616ae5eb5e5d52c5e8b0d31f' },
      { product: 'Product 3', quantity: 3, customerId: '616ae5eb5e5d52c5e8b0d31f' },
    ];

    try {
      await Order.insertMany(orders);
      console.log('Datos insertados en la colección orders');
    } catch (err) {
      console.error('Error al insertar los datos', err);
    }

    mongoose.connection.close();
  })
  .catch(err => console.error('Error al conectarse a MongoDB', err));
