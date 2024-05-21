import { toEuro } from '../js/products.js';
import {updateNumberOfElementsInTheCart} from '../js/header-footer.js';

const productObject = JSON.parse(localStorage.getItem('productDetails'));
const pTotal = document.getElementById('total');
const spanQuantityLabel = document.getElementById('quantity-label');
const nudQuantity = document.getElementById('quantity');
const btnAddToCart = document.getElementById('add-to-cart-button');
const rdbBuy = document.getElementById('buy');
const rdbRent = document.getElementById('rent');
const radioType = document.getElementsByName('type');  //rdbBuy + rdbRent

let singlePrice;
let type;    //buy or rent
let total;

chooseType();

btnAddToCart.addEventListener('click', addProductToCart);

for (const rdb of radioType) {
  rdb.addEventListener('click', chooseType);
}

nudQuantity.addEventListener('change', calculateTotal);

function chooseType() {
  if (rdbBuy.checked)
    type = rdbBuy.id;
  else
    type = rdbRent.id;

  nudQuantity.value = 1;
  calculateTotal();
};

function calculateTotal() {
  if (type == 'buy') {
    spanQuantityLabel.innerText = 'Numero pezzi:';
    singlePrice = productObject.priceCents;
  }
  else {
    spanQuantityLabel.innerText = 'Numero giorni:';
    singlePrice = productObject.rentPrice;
  }

  total = singlePrice * nudQuantity.value;
  pTotal.innerText = `${toEuro(total)} €`;
};

function addProductToCart() {
  let newProduct = {  //add product which is not already in the cart
    id: productObject.id,
    name: productObject.name,
    image: productObject.image,
    rating: {
      stars: productObject.rating.stars,
      ratingCount: productObject.rating.ratingCount
    },
    priceCents: productObject.priceCents,
    rentPrice: productObject.rentPrice,
    quantity: parseInt(nudQuantity.value),
    type: type
  }

  let cart;
  cart = JSON.parse(localStorage.getItem('cartList')) || (cart = []);  //if cart is null set it to empty array
  /*if (cart === null) {
    cart = [newProduct];
  }
  else {*/
    let productInCart = cart.find(obj => obj.id === productObject.id && obj.type === type);  //quantity in localstorage

    if (productInCart) {  //returns if product is already in the cart and type matches (rent or buy)
      console.log('product already in cart');
      if (productInCart.quantity + newProduct.quantity > 10) {
        productInCart.quantity = 10;
      }
      else {
        productInCart.quantity += newProduct.quantity;
      }
    }
    else {
      cart.push(newProduct);
    }
  //}

  //set item to show added div in catalog
  localStorage.setItem('productAdded', JSON.stringify(newProduct));

  localStorage.setItem('cartList', JSON.stringify(cart));

  updateNumberOfElementsInTheCart();
};