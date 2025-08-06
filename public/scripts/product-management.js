const deleteProductButtonElements = document.querySelectorAll('#adminDeleteProduct');


function deleteProduct(event) {
    console.log('Delete button clicked');
    
  const productId = event.target.dataset.productid;
  const csrfToken = event.target.dataset.csrf;
        fetch('/admin/products/' + productId + '?_csrf=' + csrfToken ,{
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                event.target.closest('.product-item').remove();
            } else {
                alert('Failed to delete product.');
            }
        });
}
for (const deleteButtonElement of deleteProductButtonElements) {
    deleteButtonElement.addEventListener('click', deleteProduct);
}