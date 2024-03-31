// Retrieve HTML elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Function to render products
function renderProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// Function to render cart items
function renderCart() {
  cartList.innerHTML = "";
  const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Function to add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    cartItems.push({ id: product.id, name: product.name, price: product.price });
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
  }
}

// Event listener for Add to Cart buttons
productList.addEventListener("click", event => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

// Event listener for Clear Cart button
clearCartBtn.addEventListener("click", () => {
  sessionStorage.removeItem("cart");
  renderCart();
});

// Initial rendering
renderProducts();
renderCart();
