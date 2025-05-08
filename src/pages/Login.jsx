import React, { useState, useContext } from "react";
import "./styles/Login.css";
import axios from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../stateContext/stateContext";
const API_URL = import.meta.env.VITE_API_URL;

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    const data = { email: email, password: password };
    axios.post(`${API_URL}/user/login`, data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="login">
      <div className="container">
        <p>Login</p>
        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};
