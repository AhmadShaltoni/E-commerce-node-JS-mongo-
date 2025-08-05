const product = require('../models/product.model');


async function getProducts(req, res ,next) {

    let products;
    try {
        products = await product.findAll();
         res.render('admin/products/all-product', { pageTitle: 'Admin Products', products: products });
    } catch (error) {
        return next(error);
    }
   
}

function getNewProduct(req, res) {
    res.render('admin/products/new-product', { pageTitle: 'New Product' });
}
async function createNewProduct(req, res,next) {
    const newProduct = new product({
        title: req.body.title,
        summary: req.body.summary,
        price: req.body.price,
        description: req.body.description,
        image: req.file.filename,
    });
    try{
   await newProduct.save();

    }catch(error){
        next(error);
        return;
    }
    res.redirect('/admin/products');
}
module.exports = {
    getProducts,
    getNewProduct,
    createNewProduct
};
