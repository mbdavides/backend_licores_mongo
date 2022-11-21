const mongoose = require("mongoose");
const ventaSchema = mongoose.Schema({
 
  id_product: {
    type: String,
    require: true,
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
    require: true,
  },

  subtotal: {
    type: Number,
    require: true,
  },

  //timestamps:
  fecha_venta: {
    type: Date,
    default: Date.now,
  }

});

module.exports = mongoose.model('ventas', ventaSchema);