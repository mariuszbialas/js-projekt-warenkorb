'use strict';

// KONSTANTEN / VARIABLEN
const elements = {};

// FUNKTIONEN
const domMapping = () => {
    elements.shop = dom.sel('main');
    elements.cart = dom.sel('div .cart');
    elements.cartBasket = dom.sel('.cart-info');
    elements.cartProductsNumber = dom.sel('header .cart-info-number') 

}

const appendEventlisteners = () => {
    elements.cartBasket.addEventListener('click', utills.showShoppingCart);
}

const init = () => {
    products.fetchData();
    domMapping();
    appendEventlisteners();
    shoppingCart.render();
    if(shoppingCartItems.length) utills.showItemInCartNumber();
}

// INIT
document.addEventListener("DOMContentLoaded", init);