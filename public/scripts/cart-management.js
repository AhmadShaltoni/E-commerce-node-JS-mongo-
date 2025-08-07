const addToCartButtonElement = document.querySelector('#product-details button');
const cartBadgeElement = document.querySelector('.nav-items .badge');

async function addToCart() {
    let response;
   try{
  response = await fetch('/cart/items', {
        method: 'POST',
        body: JSON.stringify({
            productId: addToCartButtonElement.dataset.productid,
            _csrf: addToCartButtonElement.dataset.csrf
        }),
    headers: {
        'Content-Type': 'application/json',
    }
});
}catch (error) {
    alert('Adding product to cart failed!');
    return;
}
    if (!response.ok) {
        alert('Adding product to cart failed!');
        return;
    }
    const responseData = await response.json();
    const newTotalQuantity= await responseData.newTotalItems;
    cartBadgeElement.textContent = newTotalQuantity;

}
addToCartButtonElement.addEventListener('click', addToCart);