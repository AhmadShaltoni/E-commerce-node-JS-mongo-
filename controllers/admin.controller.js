const Product = require('../models/product.model');
const Order = require('../models/order.model')

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

async function deleteProduct(req,res,next){
    let product;
        try {
             product = await Product.findById(req.params.id)
              await product.remove();

    } catch (error) {
         next(error);
         return;
    }
        res.json({message: 'Delete product'})
}


async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render('admin/orders/admin-orders', {
      orders: orders
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;

  try {
    const order = await Order.findById(orderId);

    order.status = newStatus;

    await order.save();

    res.json({ message: 'Order updated', newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

module.exports = {
    getProducts,
    getNewProduct,
    createNewProduct,
    getUpdateProduct,
    updateProduct,
    deleteProduct,
    getOrders,
    updateOrder
};
