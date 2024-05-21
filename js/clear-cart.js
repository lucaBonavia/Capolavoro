import {updateNumberOfElementsInTheCart} from '../js/header-footer.js';

window.addEventListener('load', clearCartList);

function clearCartList() {
  localStorage.clear();
  updateNumberOfElementsInTheCart();
}