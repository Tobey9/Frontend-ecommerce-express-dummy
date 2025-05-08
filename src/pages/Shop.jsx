import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../config/axiosConfig";
import "./styles/Shop.css";
import { LuSlidersHorizontal } from "react-icons/lu";
import { Footer } from "../components/Footer";
const API_URL = import.meta.env.VITE_API_URL;

export const Shop = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const categoryQuery = category ? `?category=${category}` : "";
    console.log(category);
    axios
      .get(`${API_URL}/products${categoryQuery}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [category]);

  return (
    <>
      <div className="shop">
        {category ? (
          <div className="header">
            <p>Shop</p>
            <h3>{category}</h3>
            <p>
              Show Filters <LuSlidersHorizontal />
            </p>
          </div>
        ) : (
          <div className="header">
            <h3>Shop</h3>
            <p>
              Show Filters <LuSlidersHorizontal />
            </p>
          </div>
        )}

        <div className="grid-products">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <div className="product-img">
                  <img src={product.image_url} alt={product.name} />
                </div>

                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};
