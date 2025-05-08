import React, { useState } from "react";
import "./QuantityCounter.css";

export const QuantityCounter = ({ initial = 1, onChange }) => {
  const [quantity, setQuantity] = useState(initial);

  const increase = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onChange(newQty);
  };

  const decrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onChange(newQty);
    }
  };

  return (
    <div className="counter">
      <button onClick={decrease}>-</button>
      <span>{quantity}</span>
      <button onClick={increase}>+</button>
    </div>
  );
};
