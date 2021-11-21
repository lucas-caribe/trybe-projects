function updateCartValue(price) {
  const cartTotal = document.querySelector('.total-price');
  const totalPrice = Number(cartTotal.innerText) * 100;

  cartTotal.innerText = (totalPrice + price * 100).toFixed(0) / 100;
}

function getFromLocalStorage() {
  const savedItems = localStorage.getItem('cartItems');

  if (savedItems) return JSON.parse(savedItems);

  return [];
}

function saveCartToLocalStorage() {
  const cartItems = document.querySelectorAll('.cart__item');

  if (cartItems) {
    const itemsToSave = [];

    cartItems.forEach((item) => {
      const name = item.innerText.match(/(?<=NAME: ).*?(?= \|)/g)[0];
      const sku = item.innerText.match(/(?<=SKU: ).*?(?= \|)/g)[0];
      const price = item.innerText.match(/(?<=PRICE: \$).*/g)[0];

      itemsToSave.push({ sku, name, price });
    });

    localStorage.setItem('cartItems', JSON.stringify(itemsToSave));
  }
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

async function cartItemClickListener(event) {
  const text = event.target.innerText;

  const price = text.match(/(?<=PRICE: \$).*/g)[0];

  updateCartValue(-price);

  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function setCartItem({ sku, name, salePrice }) {
  const cartItems = document.querySelector('.cart__items');

  cartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
}

function clearCartListener() {
  const emptyCartButton = document.querySelector('.empty-cart');

  emptyCartButton.addEventListener('click', () => {
    const cartItems = document.querySelector('.cart__items');
    cartItems.innerHTML = '';

    const cartTotal = document.querySelector('.total-price');
    cartTotal.innerText = '0';

    localStorage.removeItem('cartItems');
  });
}

async function itemClickListener(event) {
  const sku = getSkuFromProductItem(event.target.parentElement);

  const response = await fetch(`https://api.mercadolibre.com/items/${sku}`);
  const { title: name, price: salePrice } = await response.json();

  updateCartValue(salePrice);
  setCartItem({ sku, name, salePrice });
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  const addButton = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  addButton.addEventListener('click', itemClickListener);

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(addButton);

  return section;
}

function loadingElement() {
  const loadingDiv = document.createElement('div');
  loadingDiv.innerText = 'loading';
  loadingDiv.className = 'loading';

  return loadingDiv;
}

async function fetchProductSearch(query) {
  const itemsContainer = document.querySelector('.items');
  const loadingDiv = loadingElement();

  itemsContainer.appendChild(loadingDiv);

  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${query}`,
  );
  const { results } = await response.json();

  loadingDiv.remove();

  results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    itemsContainer.appendChild(createProductItemElement({ sku, name, image }));
  });
}

function populateCartFromStorage() {
  const savedItems = getFromLocalStorage();

  if (savedItems) {
    savedItems.forEach(({ sku, name, price }) => {
      updateCartValue(price);
      setCartItem({ sku, name, salePrice: price });
    });
  }
}

window.onload = () => {
  populateCartFromStorage();
  fetchProductSearch('computador');
  clearCartListener();
};

window.onbeforeunload = () => {
  saveCartToLocalStorage();
};
