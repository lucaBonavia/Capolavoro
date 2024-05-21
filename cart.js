import { toEuro, formatRating } from '../js/products.js';
import {updateNumberOfElementsInTheCart} from '../js/header-footer.js';

let cart;
cart = JSON.parse(localStorage.getItem('cartList')) || (cart = []);
/*if (cartList === null) {
  cartList = [];
}*/

const divProductsContainer = document.getElementById('products-container');

populateCart();

function updateProductTotal(product, spanSelectQuantity, selectQuantity, pTotal) {
  let prodObj = cart.find(obj => obj.id === product.id && obj.type === product.type);  //change quantity by reference of product in cartList
  if(!prodObj) {
    console.error('Errore: prodotto non trovato');
    return;
  }
  
  let total;
  if (product.type == 'buy') {
    spanSelectQuantity.innerText = "Numero pezzi:";
    total = product.priceCents * parseInt(selectQuantity.value);
  }
  else {
    spanSelectQuantity.innerText = "Numero giorni:";
    total = product.rentPrice * parseInt(selectQuantity.value);
  }
  
  prodObj.quantity = parseInt(selectQuantity.value);  //update quantity in cartList
  localStorage.setItem('cartList', JSON.stringify(cart));  //keeps updates when page is reloaded
  
  pTotal.innerText = `${toEuro(total)} €`;

  updateCartTotal();
  updateNumberOfElementsInTheCart();
};

function updateCartTotal() {
  const pTotal = document.getElementById('total-of-cart');
  
  let total = 0;
  for(const product of cart) {
    if(product.type == 'buy') {
      total += product.quantity * product.priceCents;
    }
    else {
      total += product.quantity * product.rentPrice;
    }
  }

  pTotal.innerText = `Totale: ${toEuro(total)}`;
  console.log(total);
}

function populateCart() {
  let totalCart;

  const orderDiv = document.getElementById('js-order-div');
  divProductsContainer.innerHTML = '';
  
  const main = document.querySelector('main');
  if (cart.length <= 0) {  //empty cart
    main.classList.add('h-100', 'container', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center');

    orderDiv.classList.add('d-none');

    const img = document.createElement('img');
    img.src = 'img/empty-cart.png';
    img.classList.add('h-50');

    const p = document.createElement('p');
    p.classList.add('h1');
    p.innerText = "Il tuo carrello Sports Diamond è vuoto";
    
    const a = document.createElement('a');
    a.href = 'catalog.html';
    a.classList.add('btn', 'btn-primary', 'fs-3', 'fw-bold');
    a.innerText = 'Vai al catalogo';

    main.appendChild(img);
    main.appendChild(p);
    main.appendChild(a);
  }
  else {
    main.classList.remove('h-100');
    orderDiv.classList.remove('d-none');

    totalCart = 0;
    let total = 0;

    for (const product of cart) {

      const divSingleProduct = document.createElement('div');
      divSingleProduct.classList.add('row', 'border', 'border-1', 'rounded-4', 'p-3', 'm-3');

      const divFirstColumn = document.createElement('div');
      divFirstColumn.classList.add('col-md-6');

      const imgProduct = document.createElement('img');
      imgProduct.classList.add('card-img-top');
      imgProduct.src = `${product.image}`;

      divFirstColumn.appendChild(imgProduct);

      const divSecondColumn = document.createElement('div');
      divSecondColumn.classList.add('col-md-6');

      const pProductName = document.createElement('p');
      pProductName.classList.add('fs-3', 'fw-bold');
      pProductName.innerText = product.name;
      divSecondColumn.appendChild(pProductName);

      const divRating = document.createElement('div');

      const pRatingStars = document.createElement('span');
      pRatingStars.innerText = `${formatRating(product.rating.stars)} `;

      const imgStar = document.createElement('img');
      imgStar.src = `stelle/${product.rating.stars}.png`;
      imgStar.classList.add('stars');

      const pRatingCount = document.createElement('span');
      pRatingCount.innerText = ` ${product.rating.ratingCount}`;

      divRating.appendChild(pRatingStars);
      divRating.appendChild(imgStar);
      divRating.appendChild(pRatingCount);
      divSecondColumn.appendChild(divRating);

      //Quantity
      const divQuantity = document.createElement('div');
      divQuantity.classList.add('my-2');

      //Label select
      const spanSelectQuantity = document.createElement('span');
      spanSelectQuantity.for = 'quantity';

      if (product.type == 'buy') {
        pProductName.innerText += ' - ACQUISTO';
        spanSelectQuantity.innerText = "Numero pezzi:";
        total = product.priceCents * product.quantity;
      }
      else {
        pProductName.innerText += ' - NOLEGGIO';
        spanSelectQuantity.innerText = "Numero giorni:";
        total = product.rentPrice * product.quantity;
      }

      //Select
      const selectQuantity = document.createElement('select');
      selectQuantity.classList.add('quantity-select', 'js-quantity-select', 'mb-3');
      selectQuantity.name = 'quantity';
      selectQuantity.id = 'quantity';

      for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        console.log(product.quantity);

        selectQuantity.appendChild(option);
      }
      selectQuantity.value = product.quantity;
      divQuantity.appendChild(spanSelectQuantity);
      divQuantity.appendChild(selectQuantity);

      divSecondColumn.appendChild(divQuantity);

      //Total
      const pTotal = document.createElement('p');
      console.log(total);
      pTotal.innerText = `${toEuro(total)} €`;

      totalCart += total;

      selectQuantity.addEventListener('change', () => updateProductTotal(product, spanSelectQuantity, selectQuantity, pTotal));

      divSecondColumn.appendChild(pTotal);

      const divDelete = document.createElement('div');
      divDelete.classList.add('text-end');

      const btnDelete = document.createElement('button');
      btnDelete.classList.add('btn', 'btn-danger', 'remove-from-cart-button');

      const imgDelete = document.createElement('img');
      imgDelete.src = 'img/delete.png';
      imgDelete.classList.add("img-delete");

      btnDelete.appendChild(imgDelete);
      divDelete.appendChild(btnDelete);
      divSecondColumn.appendChild(divDelete);

      divSingleProduct.appendChild(divFirstColumn);      //Column of left
      divSingleProduct.appendChild(divSecondColumn);     //Column of right
      divProductsContainer.appendChild(divSingleProduct);

      btnDelete.addEventListener('click', () => removeProductFromCart(product));
    }

    const pTotalCart = document.getElementById('total-of-cart');
    pTotalCart.innerText = `Totale: ${toEuro(totalCart)} €`;
  }
}

function removeProductFromCart(product) {
  cart.splice(cart.findIndex(obj => obj.id === product.id && obj.type === product.type), 1);  //remove product object
  localStorage.setItem('cartList', JSON.stringify(cart));
  populateCart();
  updateNumberOfElementsInTheCart();
}