const cartContainer = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalDisplay.textContent = "0.00";
    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (item, i) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <h3>${item.name}</h3>
          <p>$${item.price} × ${item.quantity}</p>
        </div>
        <button onclick="removeItem(${i})">Remove</button>
      </div>
    `
    )
    .join("");

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  totalDisplay.textContent = total.toFixed(2);
}

window.removeItem = (index) => {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

document.getElementById("checkout").addEventListener("click", () => {
  alert("Checkout not implemented yet — integrate with /api/orders next!");
});

renderCart();
