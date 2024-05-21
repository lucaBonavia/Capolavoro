//render catalog items
import { products, toEuro } from '../js/products.js';

let productsCopy;  //copy of products in order not to modify original data

const cardsDiv = document.getElementById('cards');
const sortModeSelect = document.querySelector('.js-quantity-select');

sortModeSelect.addEventListener('change', changeSortMode);

sortModeSelect.options.selectedIndex = 0;  //default choice
changeSortMode();

populateCatalog();

/*function handleProductAdded() {
  //load div with product JUST added to cart if present in localstorage
  let productAdded = JSON.parse(localStorage.getItem('productAdded'))
  const productAddedDiv = document.getElementById('js-product-added');

  if (productAdded === null) {  //no item has just been added to cart
    productAddedDiv.classList.remove('d-flex');
    productAddedDiv.classList.add('d-none');
  }
  else {
    productAddedDiv.classList.add('d-flex');
    productAddedDiv.classList.remove('d-none');

    const productAddedImg = document.getElementById('product-added-img');
    productAddedImg.src = productAdded.image;

    localStorage.removeItem('productAdded');  //not shown again when page is reloaded
  }
}*/

//handleProductAdded();

function changeSortMode() {
  const sortMode = sortModeSelect.value;
  console.log(sortMode);

  productsCopy = [...products];
  switch (sortMode) {
    case 'A-Z':
      productsCopy.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'Z-A':
      productsCopy.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'buy-ascending':
      productsCopy.sort((a, b) => a.priceCents - b.priceCents);
      break;
    case 'buy-descending':
      productsCopy.sort((a, b) => b.priceCents - a.priceCents);
      break;
    case 'rent-ascending':
      productsCopy.sort((a, b) => a.rentPrice - b.rentPrice);
      break;
    case 'rent-descending':
      productsCopy.sort((a, b) => b.rentPrice - a.rentPrice);
      break;
    case 'rating-count-ascending':
      productsCopy.sort((a, b) => a.rating.ratingCount - b.rating.ratingCount);
      break;
    case 'rating-count-descending':
      productsCopy.sort((a, b) => b.rating.ratingCount - a.rating.ratingCount);
      break;
    case 'rating-stars-ascending':
      productsCopy.sort((a, b) => a.rating.stars - b.rating.stars);
      break;
    case 'rating-stars-descending':
      productsCopy.sort((a, b) => b.rating.stars - a.rating.stars);
      break;
  }

  populateCatalog();  //reload catalog
}

function populateCatalog() {
  cardsDiv.innerHTML = '';
  
  for (const product of productsCopy) {
    const divCard = document.createElement('div');
    divCard.classList.add('product-card', 'col-lg-3', 'col-md-4', 'col-6', 'p-1');
    divCard.setAttribute('data-id', product.id);

    const a = document.createElement('a');
    a.href = 'product-details.html';
    a.classList.add('text-decoration-none');

    const divDescription = document.createElement('div');
    divDescription.classList.add('card', 'h-100', 'd-flex', 'flex-column', 'justify-content-between');

    const divImage = document.createElement('div');
    divImage.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'h-100', 'p-2');

    const imgProduct = document.createElement('img');
    imgProduct.classList.add('card-img-top');
    imgProduct.src = product.image;

    const divBody = document.createElement('div');
    divBody.classList.add('card-body');

    const pName = document.createElement('p');
    pName.classList.add('card-title');
    pName.innerText = product.name;

    const divText = document.createElement('div');
    divText.classList.add('card-text');

    const imgStars = document.createElement('img');
    imgStars.classList.add('rating-img');
    imgStars.src = `stelle/${product.rating.stars}.png`;

    const span = document.createElement('span');
    span.classList.add('text-primary');
    span.innerText = `${product.rating.ratingCount}`;

    const pBuy = document.createElement('p');
    pBuy.classList.add('fw-bold', 'mb-1');
    pBuy.innerText = `${toEuro(product.priceCents)} €`;

    const pRent = document.createElement('p');
    pRent.classList.add('fw-bold', 'mb-1');
    pRent.innerText = `${toEuro(product.rentPrice)} €/giorno`;


    divText.appendChild(imgStars);
    divText.appendChild(span);
    divText.appendChild(pBuy);
    divText.appendChild(pRent);

    divBody.appendChild(pName);
    divBody.appendChild(divText);
    divImage.appendChild(imgProduct);

    divDescription.appendChild(divImage);
    divDescription.appendChild(divBody);
    a.appendChild(divDescription);
    divCard.appendChild(a);
    cardsDiv.appendChild(divCard);

    divCard.addEventListener('click', () => setProductLS(divCard));
  }
}

function setProductLS(productDiv) {
  console.log(productDiv);
  const { id } = productDiv.dataset;
  console.log(id);

  const product = products.find(product => product.id == id);
  if (product) {
    localStorage.setItem('productDetails', JSON.stringify(product));
  }
  else {
    console.error('ERRORE: prodotto non trovato.');
  }

  console.log(localStorage);
}