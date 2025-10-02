import { addToCart, money } from "../utils/cart";

const PLANS = [
  {
    id: "basic",
    kind: "subscription",
    title: "Basic",
    price: 7.99,
    perks: ["HD streaming", "1 device"],
  },
  {
    id: "standard",
    kind: "subscription",
    title: "Standard",
    price: 12.99,
    perks: ["Full HD", "2 devices", "No ads"],
    badge: "Popular",
  },
  {
    id: "premium",
    kind: "subscription",
    title: "Premium",
    price: 17.99,
    perks: ["4K HDR", "4 devices", "Download offline"],
  },
];

export default function Subscriptions() {
  return (
    <section className="container">
      <div className="card">
        <h1>Subscriptions</h1>
        <p className="muted">Pick a plan and add it to your cart.</p>

        <ul className="grid cards" style={{ listStyle: "none", padding: 0 }}>
          {PLANS.map((p) => (
            <li key={p.id} className="movie-card" style={{ paddingBottom: ".5rem" }}>
              <div className="movie-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3>{p.title}</h3>
                  <strong>{money(p.price)}/mo</strong>
                </div>
                {p.badge && (
                  <span className="muted small" style={{ fontWeight: 700 }}>
                    {p.badge}
                  </span>
                )}
                <ul className="list" style={{ marginTop: ".5rem" }}>
                  {p.perks.map((perk) => (
                    <li key={perk} className="list-item">{perk}</li>
                  ))}
                </ul>
                <div className="card-actions" style={{ marginTop: ".5rem" }}>
                  <button
                    className="btn"
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: p.id,
                        kind: p.kind,
                        title: `${p.title} Plan`,
                        price: p.price,
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
