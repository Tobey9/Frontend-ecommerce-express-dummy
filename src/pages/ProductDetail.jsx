import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axiosConfig";
import { FaTruck } from "react-icons/fa";
import "./styles/ProductDetail.css";
import { Footer } from "../components/Footer";
import { QuantityCounter } from "../components/QuantityCounter";
import { AuthContext } from "../stateContext/stateContext";
const API_URL = import.meta.env.VITE_API_URL;

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { authState } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  const addItem = async () => {
    setError("");
    setSuccessMsg("");

    if (!authState || !authState.id) {
      setError("Please log in to add items to your cart.");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/cart/${authState.id}`,
        { productId: Number(id), quantity: quantity },
        {
          withCredentials: true,
        }
      );
      setSuccessMsg("Item added to cart!");
    } catch (err) {
      console.error("Failed to add Item:", err);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <div className="product-detail">
        <div className="img-container">
          <img src={product.image_url} alt="" />
        </div>

        <div className="product-details">
          <h1>{product.name}</h1>
          <h2>{product.category}</h2>
          <h3>${product.price}</h3>

          <label>Size</label>
          <select defaultValue="">
            <option value="" disabled>
              Choose Your Size
            </option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>

          <div className="quantity-counter-container">
            <QuantityCounter initial={1} onChange={setQuantity} />
          </div>

          <div className="free-delivery-container">
            <p>
              <FaTruck className="icon" />
              Free Delivery
            </p>
          </div>

          <button onClick={addItem}>Add to Cart</button>
          {error && (
            <>
              <p className="error">{error}</p>
            </>
          )}
          {successMsg && <p className="success">{successMsg}</p>}
        </div>
      </div>

      <Footer />
    </>
  );
};
