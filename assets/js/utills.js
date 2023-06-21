'use strict';

const utills = {

    formattedCost(value) {
        return "€" + value.toLocaleString('de-DE', {
            style: 'decimal',
            minimumFractionDigits: 2
        })
    },

    // Ausgewählte Produkte in Localstorage speichern
    saveToLocalStrorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartItems))
    },

    // Produkte von Localstorage lesen
    getFromLocalStorage() {
        return JSON.parse(localStorage.getItem('shoppingCart'));
    },

    // Produkte in Localstorage löschen
    clearLocalStorage() {
        localStorage.clear();
    },

    // Zeig ein Modal-PopUp Fenster mit verschieden Info an
    showModal(info, className) {
        let container = dom.create(false, 'div', document.body, 'modal');
        container.style.display = 'block';
        let content = dom.create(false, 'div', container, 'modal-content');
        content.classList.add(className);

        let close = dom.create('&times;', 'span', content, 'close');
        dom.create(info, 'p', content);

        // schließen Buton: etfernt die modal-Elemente
        close.addEventListener('click', () => {
            container.remove();
        });
    },

    // Löschen von Warenkorb Produktmenge Anzeige 
    removeShowItemInCartNumber() {
        dom.sel('.cart-info-number').remove();
    },

    // Anzeige von Warenkorb Produktmenge
    showItemInCartNumber() {
        if (dom.sel('.cart-info-number')) this.removeShowItemInCartNumber();
        dom.create(shoppingCartItems.length, 'p', elements.cartBasket, 'cart-info-number');
    },

    // Zeig Warenkkorb Karte an
    hideShoppingCart() {
        elements.cart.classList.add('hide');
    },

    // Warenkkorb Karte ausblenden
    showShoppingCart() {
        elements.cart.classList.remove('hide');
    },

    // Rechnen Gesamwert in Warenkorb mit zusätzliche Kosten, wie Lieferung
    clalculateTotalCost(number) {
        let totalCost = 0;
        shoppingCartItems.forEach(item => {
            const { quantity, price } = item;
            totalCost += quantity * price;
        })
        if (number) totalCost += number;
        return utills.formattedCost(totalCost);
    },

    showBigPicture(source, info) {
        let background = dom.create(false, 'div', document.body, 'modal');
        // Erzeuge Großer Bild Ansicht
        let container = dom.create(false, 'div', background, 'big-picture');
        let picture = dom.create(false, 'img', container);
        picture.src = source;
        
        dom.create(info, 'p', container);

        let close = dom.create('&times;', 'span', container, 'close');
        background.style.display = 'block';
        document.body.style.overflow = "hidden";

        // schließen Buton: etfernt die modal-Elemente
        close.addEventListener('click', () => {
            background.remove();
            document.body.style.overflow = "visible";
        });

    }

}