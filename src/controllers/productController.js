const Product = require('../models/product');
const productSchema = require('../schemas/productSchema');

const productController = {
    getAll: (req, res) => {
        if(req.params._id != undefined){
            productSchema.find({_id: req.params._id})
            .then(product => {
                if (product.length > 0) {
                    res.status(200).json(product);
                } else {
                    res.status(200).json('Producto no encontrado.');
                }
            }
            ).catch(err => {
                res.status(500).json(err);
            });
        }else{
            productSchema.find()
            .sort({
                '_id': 1
            })
            .then(products => {
                res.status(200).json(products);
            }).catch(err => {
                res.status(500).json(err);
            });
        }
    },
    insert: (req, res) => {
        let newProduct = new Product();
        newProduct = {
            ...newProduct,
            ...req.body
        };
        productSchema.create(newProduct)
        .then(res.redirect('/api/products'))
        .catch(err => {
            res.status(500).json(err);
        });
    },
    update: (req, res) => {
        const updatedProduct = {...req.body}
        productSchema.findByIdAndUpdate(req.params._id, updatedProduct)
        .then(res.redirect('/api/products'))
        .catch(err => {
            res.status(500).json(err);
        });
    },
    delete: (req, res) => {
        productSchema.findByIdAndDelete(req.params._id)
        .then(res.redirect('api/products'))
    }
}


module.exports = productController;