// Single source of truth for cart storage
export const CART_KEY = "cart";
export const CART_EVENT = "cart:updated";

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT)); // live-update navbar
}

export function getSubscription() {
  return getCart().find((c) => c.kind === "subscription");
}

export function hasSubscription() {
  return Boolean(getSubscription());
}

export function addToCart(item, opts = {}) {
  const cart = getCart();
  // Enforce: only one subscription at a time
  if (item.kind === "subscription") {
    const filtered = cart.filter((c) => c.kind !== "subscription");
    filtered.unshift({ ...item, qty: 1 }); // subs are always qty=1
    return setCart(filtered);
  }

  // Accessories / other items can stack
  const idx = cart.findIndex((c) => c.id === item.id && c.kind === item.kind);
  if (idx >= 0) {
    cart[idx].qty = (cart[idx].qty || 1) + (item.qty || 1);
  } else {
    cart.unshift({ ...item, qty: item.qty || 1 });
  }
  setCart(cart);
}

export function removeFromCart(id, kind) {
  const cart = getCart().filter((c) => !(c.id === id && c.kind === kind));
  setCart(cart);
}

export function updateQty(id, kind, qty) {
  const q = Math.max(1, Number(qty) || 1);
  const cart = getCart().map((c) =>
    c.id === id && c.kind === kind ? { ...c, qty: q } : c
  );
  setCart(cart);
}

export function clearCart() {
  setCart([]);
}

export const money = (n) =>
  (n ?? 0).toLocaleString(undefined, { style: "currency", currency: "USD" });
