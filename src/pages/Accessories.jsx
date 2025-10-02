import { addToCart, money } from "../utils/cart";

const ITEMS = [
  { id: "hdmi-2m", kind: "accessory", title: "StreamList T-Shirt", price: 12.99 },
  { id: "remote", kind: "accessory", title: "StreamList Sweater", price: 24.5 },
  { id: "stand", kind: "accessory", title: "SteamList Mug", price: 18.0 },
  { id: "popcorn", kind: "accessory", title: "Popcorn Kit", price: 9.75 },
];

export default function Accessories() {
  return (
    <section className="container">
      <div className="card">
        <h1>Accessories</h1>
        <p className="muted">Add gear and goodies to your cart.</p>

        <ul className="grid cards" style={{ listStyle: "none", padding: 0 }}>
          {ITEMS.map((it) => (
            <li key={it.id} className="movie-card" style={{ paddingBottom: ".5rem" }}>
              <div className="movie-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3>{it.title}</h3>
                  <strong>{money(it.price)}</strong>
                </div>
                <div className="card-actions" style={{ marginTop: ".5rem" }}>
                  <button
                    className="btn"
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: it.id,
                        kind: it.kind,
                        title: it.title,
                        price: it.price,
                        qty: 1,
                      })
                    }
                  >
                    <span className="material-symbols-outlined" aria-hidden>add_shopping_cart</span>
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
