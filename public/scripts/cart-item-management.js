const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management')

async function updateCartItem(event){
event.preventDefault();
const form = event.target;
const productId =   form.dataset.productid;
const csrfToken = form.dataset.csrf;
const quantity = form.firstElementChild.value;

let response ;
try{
 response = await  fetch('/cart/items', {
    method : 'PATCH',
    body : JSON.stringify({
        productId: productId,
        quantity:quantity,
        _csrf:csrfToken
    }),
    headers:{
        'Content-Type': 'application/json'
    }
})
}catch(err){
    alert('somthing went wrrong');
    return;
}
    if(!response.ok){
    alert('somthing went wrrong');
    return;
    }
    const responseData = await response.json();
    console.log("responseData",responseData);
    
    if(responseData.updatedItemPrice === 0){
        form.parentElement.parentElement.remove();
    const cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price');
    cartItemTotalPriceElement.textContent = responseData.updatedItemPrice.toFixed(2);

    }else{
    const cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price');
    cartItemTotalPriceElement.textContent = responseData.updatedItemPrice.toFixed(2);
    }
    

    const cartTotalPriceElement = document.getElementById('cart-item-price');
    cartTotalPriceElement.textContent = responseData.newTotalPrice.toFixed(2);
   
    const cartBadgeElements = document.querySelectorAll('.nav-items .badge');
    for(const cartBadgeElement of cartBadgeElements){
    cartBadgeElement.textContent = responseData.newTotalQuantity;
    }
}

for(const forElement of cartItemUpdateFormElements){
    forElement.addEventListener('submit',updateCartItem)
}