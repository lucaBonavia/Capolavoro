const header = document.createElement('header');
const footer = document.createElement('footer');

footer.classList.add('bg-primary', 'border-3', 'border-top', 'border-dark', 'mt-5');

const body = document.querySelector('body');

header.innerHTML += `
<nav class="navbar navbar-expand-lg bg-primary fixed-top container-fluid border-3 border-bottom border-dark">
    <div class="container-fluid flex-nowrap">

      <a class="d-flex justify-content-start align-items-center me-5 text-decoration-none" href="index.html">
        <img class="logo" src="img/logo.png">
        <p class="fs-2 fw-bold m-0 text-dark navbar-brand">Sports Diamond</p>
      </a>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">            
          <li class="nav-item">
            <a class="nav-link text-light fw-bold text-lg ms-4 me-4 btn btn-primary" href="index.html">HOME</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light fw-bold text-lg ms-4 me-4 btn btn-primary" href="catalog.html">CATALOGO</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light fw-bold text-lg ms-4 me-4 btn btn-primary" href="contacts.html">CONTATTI</a>
          </li>
        </ul>
      </div>

      <div class="d-flex">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="mx-3">
          <a href="cart.html">
            <img class="cart-icon" src="img/cart.png" alt="icona carrello">
            <span class="position-absolute top-20 start-80 translate-middle badge rounded-pill bg-secondary" id="number-elements">0</span> <!--NUMBER OF ITEM IN THE CART-->
          </a>
        </div>
      </div>
    </div>
  </nav>
`;

footer.innerHTML = `
    <div class="container">
      <div class="row text-white">
        <div class="col-md-4 col-6 mt-2">
          <p class="h4 fw-bold">Contatti</p>
          <p>Sports Diamond SRL</p>
          <p>Via San Michele 68</p>
          <p>Fossano 12045 (CN)</p>
          <p>E-mail: l.bonavia.2995@vallauri.edu</p>
          <p>E-mail: e.secara.3294@vallauri.edu</p>
          <p>CF/ P.Iva: 08458270128</p>
        </div>

        <div class="foot col-4 mt-2 d-none d-md-block">
          <p class="h4 fw-bold text-white">Pagamenti accettati</p>
          <div class="pagamenti row container">
            <div class="col-lg-3 col-4">
              <img src="https://www.svgrepo.com/show/508403/amex.svg">
            </div>
            <div class="col-lg-3 col-4">
              <img src="https://www.svgrepo.com/show/303191/apple-pay-logo.svg">
            </div>
            <div class="col-lg-3 col-4">
              <img src="https://www.svgrepo.com/show/303357/google-pay-primary-logo-logo.svg">
            </div>
            <div class="col-lg-3 col-4">
              <img src="https://staging.svgrepo.com/show/328122/paypal.svg">
            </div>
            <div class="col-lg-3 col-4">
              <img src="https://www.svgrepo.com/show/508703/mastercard.svg">
            </div>
            <div class="col-lg-3 col-4">
              <img src="https://www.svgrepo.com/show/508700/maestro.svg">
            </div>
            <div class="col-lg-3 col-4">
              <img src="https://www.svgrepo.com/show/508730/visa-classic.svg">
            </div>
            <div class="col-lg-3 col-4">
              <img src="https://www.svgrepo.com/show/508408/bitcoin.svg">
            </div>
            <div class="col-lg-3 col-4">
              <img src="https://www.svgrepo.com/show/508723/poste-pay.svg">
            </div>
            <div class="col-lg-3 col-4">
              <img src="https://www.svgrepo.com/show/508405/bancontact-payconiq.svg">
            </div>
            <div class="col-lg-3 col-4">
              <img src="https://www.svgrepo.com/show/508404/amazon-pay.svg">
            </div>
            <div class="col-lg-3 col-4">
              <img src="https://www.svgrepo.com/show/508410/cb.svg">
            </div>
          </div>
        </div>

        <div class="col-md-4 col-6 mt-2">
          <p class="h4 fw-bold text-white">Social</p>

          <a class="social-link text-decoration-none text-white m-1" href="https://www.instagram.com/">
            <div class="social-container">
              <img class="social-img" src="social/instagram.png" alt="logo instagram">
              <span>Instagram</span>
            </div>
          </a>

          <a class="social-link text-decoration-none text-white m-1" href="https://twitter.com/">
            <div class="social-container">
              <img class="social-img" src="social/x.png" alt="logo X">
              <span>Twitter (X)</span>
            </div>
          </a>

          <a class="social-link text-decoration-none text-white m-1" href="https://www.youtube.com/">
            <div class="social-container">
              <img class="social-img" src="social/youtube.png" alt="logo youtube">
              <span>Youtube</span>
            </div>
          </a>

          <a class="social-link text-decoration-none text-white m-1" href="https://www.facebook.com/">
            <div class="social-container">
              <img class="social-img" src="social/facebook.png" alt="logo facebook">
              <span>Facebook</span>
            </div>
          </a>

          <a class="social-link text-decoration-none text-white m-1" href="https://tiktok.com/">
            <div class="social-container">
              <img class="social-img" src="social/tiktok.png" alt="logo tik tok">
              <span>TikTok</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  `;

body.prepend(header);
body.appendChild(footer);

updateNumberOfElementsInTheCart();

export function updateNumberOfElementsInTheCart () {
  const numberElementsInTheCart = document.getElementById('number-elements');

  let cart;
  cart = JSON.parse(localStorage.getItem('cartList')) || (cart = []);
  /*if(cart === null) {
    cart = [];
  }*/
  
  numberElementsInTheCart.innerText = `${getNumberOfProducts(cart)}`;
};

function getNumberOfProducts(cartList) {
  let numProducts = 0;

  for(const product of cartList) {
    if(product.type == 'rent') {
      numProducts++;
    }
    else {
      numProducts += product.quantity;
    }
  }
  
  return numProducts;
}