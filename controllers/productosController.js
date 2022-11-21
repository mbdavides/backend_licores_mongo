const productos = require('../models').productosSchema;

module.exports = {
    list(req, res) {
        return productos
            .find()
            .then((productos) => res.status(200).send(productos))
            .catch((error) => { res.status(400).send(error); });
    },
    
    getById(req, res) {
        console.log(req.params.id);
        return productos
            .findById(req.params.id)
            .then((productos) => {
                console.log(productos);
                if (!productos) {
                    return res.status(404).send({
                        message: 'Data Not Found',
                    });
                }
                return res.status(200).send(productos);
            })
            .catch((error) =>
                res.status(400).send(error));
    },
    
    add(req, res) {
        return productos
            .create({
                imagen: req.body.imagen,
                nombre: req.body.nombre,
                precio: req.body.precio,
                stock: req.body.stock,
                descripcion: req.body.descripcion,
                categoria: req.body.categoria
            })
            .then((productos) => res.status(201).send(productos))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return productos
            .findById(req.params.id)
            .then(productos => {
                if (!productos) {
                    return res.status(404).send({
                        message: 'cita Not Found',
                    });
                }
                return productos
                    .update({
                        imagen: req.body.imagen || productos.imagen,
                        nombre: req.body.nombre || productos.nombre,
                        precio: req.body.precio || productos.precio,
                        stock: req.body.stock || productos.stock,
                        descripcion: req.body.descripcion || productos.descripcion,
                        categoria: req.body.categoria || productos.categoria
                    })
                    .then(() => res.status(200).send(productos))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    
    delete(req, res) {
        return productos
            .findById(req.params.id)
            .then(productos => {
                if (!productos) {
                    return res.status(400).send({
                        message: 'product Not Found',
                    });
                }
                return productos
                    .remove()
                    .then(() => res.status(204).send("Registro eliminado"))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
    
}