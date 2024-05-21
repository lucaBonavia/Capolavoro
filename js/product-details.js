//when product is clicked show description
import {toEuro, formatRating} from '../js/products.js';

function generateProductDetailsHTML(){
  const productObject = JSON.parse(localStorage.getItem('productDetails'));
  const detailsDiv = document.querySelector('.js-product-details');

  const imgDiv = document.createElement('div');
  imgDiv.classList.add('col-md-6');
  detailsDiv.appendChild(imgDiv);

  const infoDiv = document.getElementById('info');

  const productNameP = document.createElement('p');
  productNameP.innerText = productObject.info.title;

  const ulDetails = document.createElement('ul');

  for (const detail of productObject.info.list) {
    const liDetail = document.createElement('li');
    liDetail.innerText = detail;

    ulDetails.appendChild(liDetail);
  }
  infoDiv.appendChild(productNameP);
  infoDiv.appendChild(ulDetails);

  const pCountry = document.getElementsByClassName('country');
  for (const p of pCountry) {
    p.innerText += ` ${productObject.info.country}`
  }

  const pPrice = document.getElementById('price');
  pPrice.innerText = `${toEuro(productObject.priceCents)} € oppure ${toEuro(productObject.rentPrice)} €/giorno`;

  const pMark = document.getElementById('rating-mark');
  pMark.innerText = `${formatRating(productObject.rating.stars)}`;

  const spanRating = document.createElement('span');
  spanRating.innerText = productObject.rating.ratingCount;

  const imgStar = document.createElement('img');
  imgStar.src = `stelle/${productObject.rating.stars}.png`;
  imgStar.classList.add('stars', 'ms-2', 'me-5');

  pMark.appendChild(imgStar);
  pMark.appendChild(spanRating);

  const pName = document.getElementById('name');
  pName.innerText = productObject.name;

  const imgProduct = document.getElementById('product-image');
  imgProduct.src = productObject.image;

  //MODAL

  const imgModal = document.getElementById('modal-image');
  imgModal.src = productObject.image;

  const pModalDescription = document.getElementById('modal-description-title');
  pModalDescription.innerText = productObject.name;

  const imgModalSuccess = document.getElementById('modal-image-success');
  imgModalSuccess.src = productObject.image;
}

generateProductDetailsHTML();