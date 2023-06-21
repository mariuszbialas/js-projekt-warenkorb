'use strict';


const products = {

  // Ausgewählte Produktgröße zurücksetzen
  resetSizeSelect(arr) {
    arr.forEach(item => item.classList.remove('active'));
  },

  renderProducts(result) {

    result.forEach(product => {

      const { id, name, price, inStock, img, description } = product;

      let container = dom.create(false, 'div', elements.shop, 'box');

      // Bild hinzufügen
      let imgContainer = dom.create(false, 'div', container, 'pic');
      let picEl = dom.create(false, 'img', imgContainer);
      picEl.src = img;
      picEl.addEventListener('click', () => utills.showBigPicture(img, description));

      // Produkt info container erzeugen
      let prodContainer = dom.create(false, 'div', container, 'product');

      // Produkname erzeugen
      dom.create(name, 'h3', prodContainer, 'title');

      // Produktpreis erzeugen
      let prodPrice = price[0].price;
      let priceContainer = dom.create(false, 'div', prodContainer, 'price-info');
      let priceEl = dom.create(utills.formattedCost(prodPrice), 'span', priceContainer, 'price');
      dom.create(' inkl. MwSt.', 'span', priceContainer);

      // Auswahl von Produktmenge erzeugen
      let quantity = 1;
      let selectContainer = dom.create(false, 'div', prodContainer, 'select');
      if (inStock) {
        let selectEl = dom.create(false, 'select', selectContainer, 'quantity');
        for (let i = 1; i <= inStock; i++) {
          let option = dom.create(i, 'option', selectEl);
          option.value = i;
        }
        selectEl.addEventListener('change', () => quantity = selectEl.selectedIndex + 1);

        // Auswahl von Produktgröße erzeugen
        let sizeContainer = dom.create(false, 'div', selectContainer, 'select-size');
        let size = null;
        const sizeArray = [];
        for (const item of price) {
          let sizeEl = dom.create(item.size, 'span', sizeContainer, 'size');
          sizeArray.push(sizeEl);
          sizeEl.addEventListener('click', (e) => {
            products.resetSizeSelect(sizeArray);
            size = e.target.innerText;
            sizeEl.classList.add('active');
            prodPrice = item.price;
            priceEl.innerText = utills.formattedCost(prodPrice);
          });
        }

        // Zum Warenkorb Taste erzeugen
        let addToCart = dom.create('zum Warenkorb', 'button', prodContainer, 'add-to-cart');
        addToCart.addEventListener('click', () => {
          // Prüfen, ob Produktmenge und Produktgröße wurden ausgewählt
          if (quantity && size) {
            // Prüfen, ob Produkt im Warenkorb schon hinzufügt wurde
            let itemIndex = shoppingCartItems.findIndex(item => item.product === name && item.size === size);
            if (itemIndex !== -1) {
              console.log('ten produkt jest w koszyku pod indexem: ' + itemIndex);
              shoppingCartItems[itemIndex].quantity += quantity;
              utills.showModal(`${quantity} Stück <i>"${name}" </i> in Größe ${size} wurde im Warenkorb hinzugefügt`, 'info');
              utills.saveToLocalStrorage();
              shoppingCart.render();
              products.resetSizeSelect(sizeArray);
              size = null;
            } else {
              shoppingCartItems.push(
                {
                  id: id,
                  product: name,
                  price: prodPrice,
                  size,
                  quantity,
                });
              utills.showItemInCartNumber();
              utills.showModal(`Produkt "${name}" in Größe "${size} " wurde dem Warenkorb hinzugefügt.<br>Produktenge: ${quantity} Stück.`, 'info');
              utills.saveToLocalStrorage();
              shoppingCart.render();
              products.resetSizeSelect(sizeArray);
              size = null;
            }
          } else {
            utills.showModal('Produktgröße wurde nicht ausgewählt', 'warning');
          }
        });

      } else {
        dom.create('Produkt derzeit nicht vorrätig', 'p', selectContainer, 'not-in-stock');
      }

    });
  },

  fetchData() {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(products.renderProducts)
      .catch((error) => console.error(error));
  },
};
