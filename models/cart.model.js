const Product = require('./product.model');

class Cart {
    constructor(items =[] , totalQuantity = 0 , totalPrice = 0 ){
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice
    }

      async updatePrices() {
    const productIds = this.items.map(function (item) {
      return item.product.id;
    });

    const products = await Product.findMultiple(productIds);

    const deletableCartItemProductIds = [];

    for (const cartItem of this.items) {
      const product = products.find(function (prod) {
        return prod.id === cartItem.product.id;
      });

      if (!product) {
        deletableCartItemProductIds.push(cartItem.product.id);
        continue;
      }

      cartItem.product = product;
      cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
    }

    if (deletableCartItemProductIds.length > 0) {
      this.items = this.items.filter(function (item) {
        return deletableCartItemProductIds.indexOf(item.product.id) < 0;
      });
    }
    this.totalQuantity = 0;
    this.totalPrice = 0;

    for (const item of this.items) {
      this.totalQuantity = this.totalQuantity + item.quantity;
      this.totalPrice = this.totalPrice + item.totalPrice;
    }
  }


    addItem(product){
        const cartItem = {
            product:product,
            quantity:1,
            totalPrice: product.price
        }
        
        for (let i = 0; i < this.items.length; i++){
            const item = this.items[i];
            if (item.product.id === product.id){
                cartItem.quantity = +item.quantity + 1;
                cartItem.totalPrice = item.totalPrice + product.price;
                this.items[i] = cartItem;
                
                this.totalPrice += product.price
                this.totalQuantity+= 1;
                return;
            }
        }
        this.items.push(cartItem)
        this.totalQuantity+= 1;
        this.totalPrice += product.price
 
        }

        updateItem(productId,newQuantity){

                  for (let i = 0; i < this.items.length; i++){
            const item = this.items[i];
            if (item.product.id === productId && newQuantity > 0){
                const cartItem = {...item}
                const quantityChange = newQuantity - item.quantity
                cartItem.quantity = newQuantity
                cartItem.totalPrice = item.product.price * newQuantity;
                this.items[i] = cartItem;
                
               this.totalPrice = this.totalPrice + (item.product.price * quantityChange);
                this.totalQuantity = this.totalQuantity + quantityChange;
                return {updatedItemPrice : cartItem.totalPrice};
            }else if (item.product.id === productId && newQuantity <= 0){
                this.items.splice(i,1)
                 this.totalPrice -=item.totalPrice;
                this.totalQuantity = this.totalQuantity - item.quantity;
                return {updatedItemPrice : 0}
            }
        }
            if(newQuantity > 0 ){
                console.log("pppp");
                
            }

        }
    }

    module.exports=Cart;