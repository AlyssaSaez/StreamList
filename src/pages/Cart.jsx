import { useMemo } from "react";
import {
  CART_EVENT,
  clearCart,
  getCart,
  money,
  removeFromCart,
  setCart,
  updateQty,
} from "../utils/cart";
import { useEffect, useState } from "react";

export default function Cart() {
  const [items, setItems] = useState(getCart());

  useEffect(() => {
    const sync = () => setItems(getCart());
    window.addEventListener("storage", sync);
    window.addEventListener(CART_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CART_EVENT, sync);
    };
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0),
    [items]
  );
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  function changeQty(id, kind, q) {
    const qty = Number(q) || 1;
    updateQty(id, kind, qty);
    setItems(getCart());
  }

  function remove(id, kind) {
    removeFromCart(id, kind);
    setItems(getCart());
  }

  function clearAll() {
    clearCart();
    setItems(getCart());
  }

  return (
    <section className="container">
      <div className="card">
        <h1>Your Cart</h1>
        <p className="muted">
          {items.length === 0 ? "Your cart is empty." : `${items.length} item(s)`}
        </p>

        {items.length > 0 && (
          <>
            <ul className="list" style={{ marginTop: "1rem" }}>
              {items.map((it) => (
                <li key={`${it.kind}:${it.id}`} className="list-item" style={{ gap: ".75rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{it.title}</div>
                    <div className="muted small">
                      {it.kind === "subscription" ? "Subscription" : "Accessory"} • {money(it.price)}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                    <label className="muted small" htmlFor={`qty-${it.kind}-${it.id}`}>Qty</label>
                    <input
                      id={`qty-${it.kind}-${it.id}`}
                      type="number"
                      min="1"
                      value={it.qty || 1}
                      onChange={(e) => changeQty(it.id, it.kind, e.target.value)}
                      style={{ width: "68px" }}
                    />
                  </div>

                  <div style={{ width: "110px", textAlign: "right", fontWeight: 600 }}>
                    {money((it.price || 0) * (it.qty || 1))}
                  </div>

                  <button
                    type="button"
                    className="icon-btn danger"
                    onClick={() => remove(it.id, it.kind)}
                    title="Remove"
                  >
                    <span className="material-symbols-outlined" aria-hidden>delete</span>
                  </button>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "1rem", display: "grid", gap: ".35rem", justifyContent: "end" }}>
              <div className="muted">Subtotal: <strong>{money(subtotal)}</strong></div>
              <div className="muted">Tax (8%): <strong>{money(tax)}</strong></div>
              <div>Grand Total: <strong>{money(total)}</strong></div>

              <div style={{ display: "flex", gap: ".5rem", marginTop: ".5rem" }}>
                <button className="btn" type="button" onClick={() => alert("Checkout not implemented (demo)")}>
                  <span className="material-symbols-outlined" aria-hidden>shopping_bag</span>
                  Checkout
                </button>
                <button className="btn" type="button" onClick={clearAll}>
                  <span className="material-symbols-outlined" aria-hidden>delete_sweep</span>
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
