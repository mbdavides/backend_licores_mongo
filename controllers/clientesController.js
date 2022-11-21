const clientes = require('../models').clientesSchema;

module.exports = {
    list(req, res) {
        return clientes
            .find()
            .then((clientes) => res.status(200).send(clientes))
            .catch((error) => { res.status(400).send(error); });
    },
    
    getById(req, res) {
        console.log(req.params.id);
        return clientes
            .findById(req.params.id)
            .then((clientes) => {
                console.log(clientes);
                if (!clientes) {
                    return res.status(404).send({
                        message: 'Data Not Found',
                    });
                }
                return res.status(200).send(clientes);
            })
            .catch((error) =>
                res.status(400).send(error));
    },
    
    add(req, res) {
        return clientes
            .create({
                nombre: req.body.nombre,
                identificacion: req.body.identificacion,
                telefono: req.body.telefono,
                email: req.body.email,
                password: req.body.password
            })
            .then((clientes) => res.status(201).send(clientes))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return clientes
            .findById(req.params.id)
            .then(clientes => {
                if (!clientes) {
                    return res.status(404).send({
                        message: 'cita Not Found',
                    });
                }
                return clientes
                    .update({
                        nombre: req.body.nombre || clientes.nombre,
                        identificacion: req.body.identificacion || clientes.identificacion,
                        telefono: req.body.telefono || clientes.telefono,
                        email: req.body.email || clientes.email,
                        password: req.body.password || clientes.password
                    })
                    .then(() => res.status(200).send(clientes))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    
    delete(req, res) {
        return clientes
            .findById(req.params.id)
            .then(clientes => {
                if (!clientes) {
                    return res.status(400).send({
                        message: 'Client Not Found',
                    });
                }
                return clientes
                    .remove()
                    .then(() => res.status(204).send("Registro eliminado"))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
    
}