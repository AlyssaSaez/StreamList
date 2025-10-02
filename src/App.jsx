import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import StreamList from "./pages/StreamList.jsx";
import Movies from "./pages/Movies.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";
import Accessories from "./pages/Accessories.jsx";
import Cart from "./pages/Cart.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<StreamList />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="footer">© StreamList</footer>
    </div>
  );
}
