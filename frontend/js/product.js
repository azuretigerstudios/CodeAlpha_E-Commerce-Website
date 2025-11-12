import { fetchProduct } from "./api.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const container = document.getElementById("product-details");

async function loadProduct() {
  const p = await fetchProduct(id);
  container.innerHTML = `
    <div class="product-view">
      <img src="${p.image}" alt="${p.name}" />
      <h2>${p.name}</h2>
      <p>${p.description}</p>
      <p><strong>$${p.price.toFixed(2)}</strong></p>
      <button id="add-to-cart">Add to Cart</button>
    </div>
  `;

  document
    .getElementById("add-to-cart")
    .addEventListener("click", () => addToCart(p));
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item._id === product._id);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

loadProduct();
