import { fetchProducts } from "./api.js";

const productList = document.getElementById("product-list");

async function loadProducts() {
  const products = await fetchProducts();
  productList.innerHTML = products
    .map(
      (p) => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>$${p.price.toFixed(2)}</p>
      <a href="product.html?id=${p._id}">View</a>
    </div>
  `
    )
    .join("");
}

loadProducts();
