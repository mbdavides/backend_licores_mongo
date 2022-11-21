const carShop = require('../models').carShopSchema;
const productos = require('../models').productosSchema;
const ventas = require('../models').ventasSchema;

module.exports = {
    list(req, res) {
        let total = 0;
        let mostrar = {};

        return carShop
            .find()
            .then((carShop) => {
                carShop.forEach(element => {
                    total += element.precio * element.cantidad;
                });
                mostrar = JSON.parse(JSON.stringify(carShop));
                mostrar.push({"Total": total});
                res.status(200).send(mostrar);
            })
            .catch((error) => { res.status(400).send("Carrito Vacio"); });
    },

    add(req, res) {
        //recibimos id y cantidad del producto
        let id_p = req.body.id_product;
        let id_cli = req.body.id_cliente;
        let cantidad = req.body.cantidad;
        //buscamos el producto por id
        productos
            .findById(id_p)
            // Si el id esta entonces
            .then((daticos_prod => {
                carShop
                // Verificamos si el mismo producto ya lo tenemos en el carrito
                .findOne({ id_product: id_p, id_cliente: id_cli })
                // Si lo tenemos entonces sumamos cantidad
                .then((car) => {
                    let suma = parseInt(car.cantidad) + parseInt(cantidad);
                    carShop
                    .updateOne({ id_product: id_p, id_cliente: id_cli }, {
                        $set: {cantidad: suma}
                    })
                    .then(() => {
                        res.status(200).send('Se agrego cantidad')
                        }
                    )
                    .catch((error) => res.status(400).send(error))
                })
                // Si el producto no esta en el carrito entonces lo agregamos
                .catch(() => {
                    carShop.create({
                        id_product: daticos_prod._id,
                        id_cliente: id_cli,
                        imagen: daticos_prod.imagen,
                        nombre: daticos_prod.nombre,
                        precio: daticos_prod.precio,
                        descripcion: daticos_prod.descripcion,
                        cantidad: cantidad
                    })
                    res.status(200).send('Se agrego el producto')
                })
            }))
            // Si el producto no esta en la lista de productos entonces informamos que no esta
            .catch((error) => res.status(400).send(error))
    },

    confirm(req, res) {
        //buscamos al cliente del carrito
        carShop.find({ id_cliente: req.params.id })
        .then((car) => {
            car.forEach(element => {
                //consultamos stock
                productos.findById(element.id_product)
                .then((prod) => {
                    let stock = prod.stock;
                    //verificamos si hay stock suficiente
                    if (element.cantidad > stock) {
                        res.status(400).send('No hay suficiente stock de ' + element.nombre);
                    } else {
                        ventas.create({
                            id_product: element.id_product,
                            id_cliente: element.id_cliente,
                            imagen: element.imagen,
                            nombre: element.nombre,
                            precio: element.precio,
                            descripcion: element.descripcion,
                            cantidad: element.cantidad,
                            subtotal: element.precio * element.cantidad
                        });
                        // Actualizar stock
                        productos.updateOne({ _id: element.id_product }, {
                            $inc: {stock: -element.cantidad}
                        })
                        .then(() => {
                            console.log('Se actualizo el stock del producto ' + element.nombre);
                            // Borra carrito
                            carShop.deleteOne({ id_product: element.id_product, id_cliente: element.id_cliente })
                            .then(() => console.log('Registro eliminado del carrito'))
                            .catch((error) => res.status(400).send(error));
                        })
                        .catch((error) => console.log('No se pudo actualizar el stock del producto ' + element.nombre + ' ' + error));
                        console.log('Compra realizada');
                    }
                }).catch((error) => res.status(400).send(error));
            })
            res.status(200).send('Transacción Exitosa!!!');
        }).catch(() => res.send('El carrito esta vacio'));
    },
    
    delete(req, res) {
        return carShop
            .findById(req.params.id)
            .then(carShop => {
                if (!carShop) {
                    return res.status(400).send({
                        message: 'product Not Found',
                    });
                }
                return carShop
                    .remove()
                    .then(() => res.status(204).send("Registro eliminado"))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
}