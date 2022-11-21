const ventas = require('../models').ventasSchema;

module.exports = {
    list(req, res) {
        let total = 0;
        let mostrar = {};

        return ventas
            .find()
            .then((ventas) => {
                ventas.forEach(element => {
                    total += element.subtotal;
                });
                mostrar = JSON.parse(JSON.stringify(ventas));
                mostrar.push({"Total": total});
                res.status(200).send(mostrar);
            })
            .catch((error) => { res.status(400).send("No hay ventas"); });
    },
    /*
    getById(req, res) {
        console.log(req.params.id);
        return ventas
            .findById(req.params.id)
            .then((ventas) => {
                console.log(ventas);
                if (!ventas) {
                    return res.status(404).send({
                        message: 'Data Not Found',
                    });
                }
                return res.status(200).send(ventas);
            })
            .catch((error) =>
                res.status(400).send(error));
    },
    */
    update(req, res) {
        return ventas
            .findById(req.params.id)
            .then(venta => {
                if (!venta) {
                    return res.status(404).send({
                        message: 'cita Not Found',
                    });
                }
                venta
                    .update({
                        id_product: req.body.id_product || venta.id_product,
                        imagen: req.body.imagen || venta.imagen,
                        nombre: req.body.nombre || venta.nombre,
                        precio: req.body.precio || venta.precio,
                        descripcion: req.body.descripcion || venta.descripcion,
                        cantidad: req.body.cantidad || venta.cantidad,
                        subtotal: (req.body.precio || venta.precio) * (req.body.cantidad || venta.cantidad)
                    })
                    .then(() => res.status(200).send(venta))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    
    delete(req, res) {
        return ventas
            .findById(req.params.id)
            .then(ventas => {
                if (!ventas) {
                    return res.status(400).send({
                        message: 'venta Not Found',
                    });
                }
                return ventas
                    .remove()
                    .then(() => res.status(204).send("Registro eliminado"))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
}