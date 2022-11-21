const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const carShopSchema = mongoose.Schema({

  id_product: {
    type: String,
    require: true,
  },

  id_cliente: {
    type: Schema.ObjectId,
    ref: "clientes"
  },

  imagen: {
    type: String,
    require: true,
  },

  nombre: {
    type: String,
    require: true,
  },

  precio: {
    type: Number,
    require: true,
  },

  descripcion: {
    type: String,
    require: true,
  },
  
  cantidad: {
    type: Number,
    require: true
  }

});

module.exports = mongoose.model('carShop', carShopSchema);