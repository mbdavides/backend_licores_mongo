const mongoose = require("mongoose");
const carShopSchema = mongoose.Schema({

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
    require: true
  }

});

module.exports = mongoose.model('carShop', carShopSchema);