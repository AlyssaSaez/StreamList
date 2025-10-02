import { useEffect, useState } from "react";
import { CART_EVENT, getCart } from "../utils/cart";

export default function useCartCount() {
  const [count, setCount] = useState(0);

  function readCount() {
    // count total quantity from the new cart
    const items = getCart();
    const qtyTotal = items.reduce((n, i) => n + (i.qty || 1), 0);
    setCount(qtyTotal);
  }

  useEffect(() => {
    readCount();
    const onStorage = () => readCount();
    const onCartUpdated = () => readCount();
    window.addEventListener("storage", onStorage);
    window.addEventListener(CART_EVENT, onCartUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CART_EVENT, onCartUpdated);
    };
  }, []);

  return count;
}
