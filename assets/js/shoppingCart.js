'use strict';

let shoppingCartItems = utills.getFromLocalStorage() ?? [];

const shoppingCart = {

    render() {
        elements.cart.innerHTML = '';

        let shoppingCart = dom.create(false, 'div', elements.cart);

        // Warenkorb header erzeugen
        let header = dom.create(false, 'div', shoppingCart, 'cart-header');
        dom.create('Produkte im Warenkorb', 'h3', header);
        let close =  dom.create('&times;', 'span', header, 'close');
        close.addEventListener('click', () => elements.cart.classList.add('hide'));
        dom.create(false, 'hr', header);

        // Warenkorb inhalt erzeugen
        shoppingCartItems.forEach((item, itemIndex) => {
            const { product, quantity, price, size } = item;

            let container = dom.create(false, 'div', shoppingCart, 'product-list');
            dom.create(`(${quantity})`, 'span', container);
            dom.create(product, 'span', container);
            dom.create(`Größe: ${size}`, 'span', container);
            dom.create(`${utills.formattedCost(price * quantity)}€`, 'span', container)

            // Taste Produkt vom Warenkorb zu entfernen
            let removeCartProduct = dom.create('delete', 'span', container, 'material-symbols-outlined');
            removeCartProduct.addEventListener('click', () => {
                shoppingCartItems.splice(itemIndex, 1);
                utills.showItemInCartNumber();
                if (!shoppingCartItems.length) {
                    utills.removeShowItemInCartNumber();
                    total.classList.add('hide');
                }
                this.render();
            })
        });

        //Gesamten Betrag rechnen und render
        let total = dom.create(false, 'div', shoppingCart, 'total');
        if (!shoppingCartItems.length) total.classList.add('hide');
        let subtalCost = utills.clalculateTotalCost();
        let totalcost = utills.clalculateTotalCost(5.95);

        dom.create(false, 'hr', total);
        let subtotalCostDiv = dom.create(false, 'div', total, 'total-info');
        dom.create(`Zwischensumme:`, 'span', subtotalCostDiv);
        dom.create(`${subtalCost} €`, 'span', subtotalCostDiv);

        let othersCostDiv = dom.create(false, 'div', total, 'total-info');
        dom.create(`Liferkosten:`, 'span', othersCostDiv);
        dom.create(`5,95 €`, 'span', othersCostDiv);

        let totalCostDiv = dom.create(false, 'div', total, 'total-info');
        dom.create('Gesamtwert:', 'span', totalCostDiv);
        dom.create(`${totalcost} €`, 'span', totalCostDiv);

        let orderButton = dom.create(`Kostenpflichtig bestellen`, 'button', total);
        orderButton.addEventListener('click', () => {
            utills.clearLocalStorage();
            shoppingCartItems = [];
            utills.showModal('Die Bestellung wurde abgeschloßen', 'info');
            this.render();
            utills.removeShowItemInCartNumber();
            utills.hideShoppingCart();
        });



    }


}