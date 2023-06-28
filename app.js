import products from './product.js';
import cart, { addToCart, removeCartItem, clearCart, calculateTotal } from './cart.js';

const productList = document.getElementById('products');
const cartItemsList = document.getElementById('cart-items');
const totalAmount = document.getElementById('total');
const clearCartBtn = document.getElementById('clear-cart');

// Display the products
function displayProducts() {
  for (const product of products) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${product.name}</span>
      <span>$${product.price}</span>
      <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  }
}

// Display the cart items
function displayCartItems() {
  cartItemsList.innerHTML = '';
  for (const { product, quantity } of cart) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${product.name} (${quantity})</span>
      <span>$${product.price * quantity}</span>
      <button class="remove-item" data-product-id="${product.id}">Remove</button>
    `;
    cartItemsList.appendChild(li);
  }
}

// Update the total amount
function updateTotal() {
  const total = calculateTotal();
  totalAmount.textContent = `Total: $${total}`;
}

// Add event listener to the "Add to Cart" buttons
function attachAddToCartListeners() {
  const addToCartButtons = document.getElementsByClassName('add-to-cart');
  for (const button of addToCartButtons) {
    button.addEventListener('click', () => {
      const productId = parseInt(button.dataset.productId);
      const product = products.find(item => item.id === productId);
      addToCart(product, 1);
      displayCartItems();
      updateTotal();
    });
  }
}

// Add event listener to the "Remove" buttons
function attachRemoveItemListeners() {
  const removeItemButtons = document.getElementsByClassName('remove-item');
  for (const button of removeItemButtons) {
    button.addEventListener('click', () => {
      const productId = parseInt(button.dataset.productId);
      const cartItem = cart.find(item => item.product.id === productId);
      removeCartItem(cartItem);
      displayCartItems();
      updateTotal();
    });
  }
}

// Clear the cart
function clearCartHandler() {
  clearCart();
  displayCartItems();
  updateTotal();
}

// Initialize the application
function initializeApp() {
  displayProducts();
  displayCartItems();
  updateTotal();
  attachAddToCartListeners();
  attachRemoveItemListeners();
  clearCartBtn.addEventListener('click', clearCartHandler);
}

initializeApp();
