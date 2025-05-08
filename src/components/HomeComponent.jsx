import React from "react";
import "./HomeComponent.css";

import { Link } from "react-router-dom";
import { Footer } from "./Footer";

export const HomeComponent = () => {
  return (
    <div className="home-component">
      <div className="photo-grid">
        <div className="photo-card">
          <img src="/photos/woman.jpg" alt="" />
          <p>
            <Link to="/shop/Women">Women</Link>
          </p>
        </div>
        <div className="photo-card">
          <img src="/photos/man.jpg" alt="" />
          <p>
            <Link to="/shop/Men">Men</Link>
          </p>
        </div>
        <div className="photo-card">
          <img src="/photos/kid.jpg" alt="" />
          <p>
            <Link to="shop/Kids">Kids</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};
