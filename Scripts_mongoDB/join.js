const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const user=process.env.USER
const password=process.env.PASSWORD
const url = 'mongodb+srv://'+user+':'+password+'@cluster0.jbvet7u.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Conectado a MongoDB');

    const customerSchema = new mongoose.Schema({
      name: String,
      age: Number
    });
    const Customer = mongoose.model('Customer', customerSchema, 'customers');

    const orderSchema = new mongoose.Schema({
      product: String,
      quantity: Number,
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
    });
    const Order = mongoose.model('Order', orderSchema, 'orders');

    try {
      const res = await Order.aggregate([
        {
          $lookup: {
            from: 'customers',
            localField: 'customerId',
            foreignField: '_id',
            as: 'customer'
          }
        }
      ]);
      console.log('Documentos encontrados y unidos');
      console.log(res);
    } catch (err) {
      console.error('Error al encontrar los documentos', err);
    }

    mongoose.connection.close();
  })
  .catch(err => console.error('Error al conectarse a MongoDB', err));