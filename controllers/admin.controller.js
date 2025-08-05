const Product = require('../models/product.model');


async function getProducts(req, res ,next) {

    let products;
    try {
        products = await Product.findAll();
         res.render('admin/products/all-product', { pageTitle: 'Admin Products', products: products });
    } catch (error) {
        return next(error);
    }
   
}

function getNewProduct(req, res) {
    res.render('admin/products/new-product', { pageTitle: 'New Product' });
}
async function createNewProduct(req, res,next) {
    const newProduct = new Product({
        title: req.body.title,
        summary: req.body.summary,
        price: req.body.price,
        description: req.body.description,
        image: req.file.filename,
        _id: req.body.id
    });
    try{
   await newProduct.save();

    }catch(error){
        next(error);
        return;
    }
    res.redirect('/admin/products');
}
async function getUpdateProduct(req, res, next) {
    let productChoice;
    try{
         productChoice =await Product.findById(req.params.id);
         res.render('admin/products/update-product', { pageTitle: 'Update Product', product: productChoice });
    }catch(error) {
        next(error);
        return;
    }
}

async function updateProduct(req, res, next) {
    const productId = req.params.id;
    console.log('Product ID:', productId);
    
    const product = new Product({
        _id: productId,
        title: req.body.title,
        summary: req.body.summary,
        price: req.body.price,
        description: req.body.description,
        // image: req.file.filename,
    });
     if (req.file) {
        product.replaceImage(req.file.filename);
     }
    try {
        await product.save();
    } catch (error) {
         next(error);
         return;
    }
    res.redirect('/admin/products');
}

module.exports = {
    getProducts,
    getNewProduct,
    createNewProduct,
    getUpdateProduct,
    updateProduct
};
