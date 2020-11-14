module.exports = app => {
    const product = require ('../Controllers/products.controller.js');

    app.post('/products', product.create);

    app.get('/products', product.findAll);
    
    app.get('/products/:productId', product.findOne);

    app.put('/products/:productId', product.update);

    app.delete('/products/:productId', product.delete);
}