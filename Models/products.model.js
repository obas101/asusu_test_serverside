const sql = require('./db.js');

const Product = function(product){
    this.productName = product.productName;
    this.productDescription = product.productDescription;
    this.productPrice = product.productPrice;
    this.productDiscountPrice = product.productDiscountPrice;
    this.productQuantity = product.productQuantity;
}

Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct, (err, res)=> {
        if(err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('product added: ', {id:res.name, ...newProduct});
    });
};
Product.findById = (productId, result) => {
    sql.query(`SELECT * FROM products WHERE productId = ${productId}`, (err, res) =>{
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
          
        if (res.length) {
            console.log('found Product: ', res[0]);
            result(null, res[0])
            return;
        }
        result({kind: 'not found'}, null)
        return;
    });
}

Product.getAll = result=> {
    sql.query('SELECT * FROM products', (err, res)=> {
        if(err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('product: ', res);
        result(null, res)
        return;
    });
}

Product.updateById = (productId, product, result) => {
    sql.query(`UPDATE products SET productName=?, productDescription=?, productPrice=?, productDiscountPrice=?, productQuantity=? WHERE productId =?`, [product.productName, product.productDescription, product.productPrice, product.productDiscountPrice, product.productQuantity, productId],
    (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
          
        if (res.affectedRows == 0) {
            console.log('found Product: ', res[0]);
        result({kind: 'Not found'}, null);
        return;
        }
        console.log('updated Product: ')
        result(null, {productId: productId, ...product})
        return;
    });
};

    Product.remove = (productId, result) => {
    sql.query(`DELETE FROM products WHERE productId = ${productId}`, (err, res) =>{
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
          
        if (res.affectedRows == 0) {
        result({kind: 'Not found'}, null);
        return;
        }
        console.log('Deleted Product: ');
        result(null, res)
        return;
    });
}
module.exports = Product;