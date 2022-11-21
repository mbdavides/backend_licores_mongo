const mongoose = require("mongoose");
const clientesSchema = mongoose.Schema({

  nombre: {
    type: String,
    require: true,
  },

  identificacion: {
    type: String
  },

  telefono: {
    type: String
  },

  email: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  //timestamps:
  fecha_registro: {
    type: Date,
    default: Date.now,
  }

});

module.exports = mongoose.model('clientes', clientesSchema);