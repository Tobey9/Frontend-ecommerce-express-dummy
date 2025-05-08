import React, { useContext, useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import "./styles/Cart.css";
import { AuthContext } from "../stateContext/stateContext";
import { QuantityCounter } from "../components/QuantityCounter";
const API_URL = import.meta.env.VITE_API_URL;

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const { authState } = useContext(AuthContext);

  // Helper function to calculate the subtotal
  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => {
      return total + item.Product.price * item.quantity; // Assuming price is inside Product
    }, 0);
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${API_URL}/cart/${authState.id}`, {
          withCredentials: true,
        });
        setCartItems(res.data.CartItems);
        const initialSubtotal = calculateSubtotal(res.data.CartItems);
        setSubtotal(initialSubtotal);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    if (authState.id) {
      fetchCart();
    }
  }, [authState.id]);

  const updateQuantity = async (itemId, newQty) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item) return;

    try {
      await axios.put(
        `${API_URL}/cart/${authState.id}/${item.productId}`,
        {
          quantity: newQty,
        },
        { withCredentials: true }
      );

      // Update UI by modifying the quantity in state
      const updatedCartItems = cartItems.map((i) =>
        i.id === itemId ? { ...i, quantity: newQty } : i
      );
      setCartItems(updatedCartItems);

      const updatedSubtotal = calculateSubtotal(updatedCartItems);
      setSubtotal(updatedSubtotal);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const removeItem = async (itemId, productId) => {
    try {
      await axios.delete(`${API_URL}/cart/${authState.id}/${productId}`, {
        withCredentials: true,
      });

      // Update UI
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));

      // Recalculate subtotal after removing the item
      const updatedSubtotal = calculateSubtotal(
        cartItems.filter((item) => item.id !== itemId)
      );
      setSubtotal(updatedSubtotal);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleMockPayment = async () => {
    try {
      alert("Payment successful! Thank you for your order.");

      console.log("Before checkout, user ID: ", authState.id);

      await axios.delete(`${API_URL}/cart/${authState.id}`, {
        withCredentials: true,
      });

      setCartItems([]);
      setSubtotal(0);
    } catch (err) {
      console.error("Failed to simulate payment:", err);
    }
  };

  return (
    <>
      <div className="header">
        <div>
          <h2>cart</h2>
          <p>Items</p>
        </div>
      </div>

      <div className="cart">
        <div className="left">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="product-card">
                <div className="product-info">
                  <p>{item.Product?.name}</p>
                  <div className="product-detail">
                    <div className="img-container">
                      <img
                        src={item.Product?.image_url}
                        alt={item.Product?.name}
                      />
                    </div>

                    <div className="edit-item">
                      <QuantityCounter
                        initial={item.quantity}
                        onChange={(newQty) => updateQuantity(item.id, newQty)}
                      />
                    </div>
                  </div>
                </div>

                <p
                  className="remove-item"
                  onClick={() => removeItem(item.id, item.productId)}
                >
                  Remove Item
                </p>
              </div>
            ))
          ) : (
            <h3>There are no items in your cart.</h3>
          )}
        </div>

        <div className="right">
          <div className="order-summary">
            <h3>Order Summary</h3>

            <div>
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            <div>
              <p>Estimated Shipping</p>
              <p>FREE</p>
            </div>

            <div>
              <h3>Order Total</h3>
              <p>${subtotal.toFixed(2)}</p>
            </div>
          </div>

          <button onClick={handleMockPayment}>Checkout</button>
        </div>
      </div>
    </>
  );
};
