const Product = require('../Models/products.model.js')

exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Form cannot be empty"
        });
    }
    const product = new Product({
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productQuantity: req.body.productQuantity
    });

    console.log(product);

    Product.create (product, (err, data) => {
        if (err)
        return res.status(500).send ({
            message: err.message || "Some error occured while adding your products"
        });
        else 
        return res.send(data);
    });
};
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
        else
        return res.send(data);
    });
};

exports.findOne = (req, res) => {
    Product.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found")
            {
                return res.status(404).send({
                    message: `Not found product with id ${req.params.productId}.`
                });
            }
                else {
                    return res.status(500).send({
                        message: "Error retrieving product with id" + req.params.productId
                    });
                }
            }
            else return res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body){
        return res.status(400).send({
            message: "Content can not be empty!" });
        }
        Product.updateById(req.params.productId, new Product(req.body), (err, data) => {
            if(err) {
                if (err.kind === "not_found")
                {
                    return res.status(404).send({
                        message: `not found Product with id ${req.params.productId}.`
                    });
                    return;
                }
                    else {
                        return res.status(500).send({
                            message: "Error updating product with id" + req.params.productId
                        });
                        return;
                    }
                }
                    else return res.send(data); 
        });
    };
    
    exports.delete = (req, res) => {
        Product.remove(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not found") {
                return res.status(404).send({
                    message: `Not found Product with id ${req.params.productId}`
                });
            }
            else {
                return res.status(500).send({
                    message: `Could not delete product with id ${req.params.productId}`
                });
            }
        }
            else return res.send({
                message: `product was deleted successfully!`
            });
        });
        };