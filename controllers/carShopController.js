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
        let id = req.body.id;
        let cantidad = req.body.cantidad;
        //buscamos el producto por id
        productos
            .findById(id)
            // Si el id esta entonces
            .then((daticos => {
                carShop
                // Verificamos si el mismo producto ya lo tenemos en el carrito
                .findOne({ id_product: id })
                // Si lo tenemos entonces sumamos cantidad
                .then((car) => {
                    let suma = parseInt(car.cantidad) + parseInt(cantidad);
                    carShop
                    .updateOne({ id_product: id }, {
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
                        id_product: daticos._id,
                        imagen: daticos.imagen,
                        nombre: daticos.nombre,
                        precio: daticos.precio,
                        descripcion: daticos.descripcion,
                        cantidad: cantidad
                    })
                    res.status(200).send('Se agrego el producto')
                })
            }))
            // Si el producto no esta en la lista de productos entonces informamos que no esta
            .catch((error) => res.status(400).send(error))
    },

    confirm(req, res) {
        carShop.find()
        .then((car) => {
            car.forEach(element => {
                //consultamos stock
                productos.findById(element.id_product)
                .then((prod) => {
                    let stock = prod.stock;
                    //verificamos si hay stock suficiente
                    if (element.cantidad > stock) {
                        res.status(400).send('No hay suficiente stock de ' + element.nombre)
                    } else {
                        ventas.create({
                            id_product: element.id_product,
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
                        .then(() => console.log('Se actualizo el stock del producto ' + element.nombre))
                        .catch((error) => console.log('No se pudo actualizar el stock del producto ' + element.nombre + ' ' + error))
                        // Borra carrito
                        carShop.deleteOne({ id_product: element.id_product })
                        .then(() => console.log('Registro eliminado del carrito'))
                        .catch((error) => res.status(400).send(error))

                        res.status(200).send('Compra realizada')
                    }
                }).catch((error) => res.status(400).send(error))
            })
        }).catch(() => res.send('El carrito esta vacio'))
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