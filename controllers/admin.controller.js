function getProducts(req, res) {
    res.render('admin/products/all-product', { pageTitle: 'Admin Products' });
}

function getNewProduct(req, res) {
    res.render('admin/products/new-product', { pageTitle: 'New Product' });
}
function createNewProduct(req, res) {
    console.log('New product created:', req.body);
    console.log('Image file:', req.file);
    
    res.redirect('/admin/products');
}
module.exports = {
    getProducts,
    getNewProduct,
    createNewProduct
};
