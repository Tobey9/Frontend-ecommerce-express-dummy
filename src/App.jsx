import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./Navbar";
import { Shop } from "./pages/Shop";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { useEffect, useState } from "react";
import { AuthContext } from "./stateContext/stateContext";
import axios from "./config/axiosConfig";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/auth`, {
          withCredentials: true,
        });

        if (response.data.error) {
          setAuthState((prev) => ({ ...prev, status: false }));
        } else {
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            status: true,
          });
        }
      } catch (err) {
        console.error("Error fetching auth status", err);
        setAuthState((prev) => ({ ...prev, status: false }));
      }
    };

    fetchAuthStatus();
  }, []);

  const logout = async () => {
    try {
      axios
        .post(`${API_URL}/user/logout`, null, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("Logged out");
          setAuthState({ email: "", id: 0, status: false });
        });
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState, logout }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
