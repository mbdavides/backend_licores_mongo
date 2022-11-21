const mongoose = require("mongoose");
const productosSchema = mongoose.Schema({

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

  stock: {
    type: Number,
    require: true,
  },

  descripcion: {
    type: String,
    require: true,
  },

  categoria: {
    type: String,
    require: true,
  },

  //timestamps:
  fecha_ingreso: {
    type: Date,
    default: Date.now,
  }

});

module.exports = mongoose.model('productos', productosSchema);