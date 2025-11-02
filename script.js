let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update Cart Count
function updateCartCount() {
  document.querySelectorAll("#cartCount").forEach(el => el.textContent = cart.length);
}

// Display Products on Homepage
function displayProducts() {
  const list = document.getElementById("productList");
  if (!list) return;
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" loading="lazy" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p>⭐ ${p.rating}</p>
      <button onclick="viewProduct(${p.id})">View</button>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

// View Product Details
function viewProduct(id) {
  localStorage.setItem("currentProduct", id);
  window.location.href = "product.html";
}

// Display Product Details
function displayProductDetail() {
  const detail = document.getElementById("productDetail");
  if (!detail) return;
  const id = localStorage.getItem("currentProduct");
  const p = products.find(prod => prod.id == id);
  if (!p) return;
  detail.innerHTML = `
    <img src="${p.img}" loading="lazy" alt="${p.name}">
    <h2>${p.name}</h2>
    <p>Category: ${p.category}</p>
    <p>Price: ₹${p.price}</p>
    <p>Rating: ⭐ ${p.rating}</p>
    <button onclick="addToCart(${p.id})">Add to Cart</button>
  `;
}

// Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Display Cart
function displayCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((p, index) => {
    total += p.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p>${p.name} - ₹${p.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
  });
  document.getElementById("totalPrice").textContent = total;
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  displayProductDetail();
  displayCart();
  updateCartCount();
});
