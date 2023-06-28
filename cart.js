const cart = [];

export function addToCart(product, quantity) {
  const cartItem = cart.find(item => item.product.id === product.id);

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
}

export function removeCartItem(cartItem) {
  const index = cart.indexOf(cartItem);
  cart.splice(index, 1);
}

export function clearCart() {
  cart.length = 0;
}

export function calculateTotal() {
  let total = 0;
  for (const { product, quantity } of cart) {
    total += product.price * quantity;
  }
  return total;
}

export default cart;
