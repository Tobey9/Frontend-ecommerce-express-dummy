import React, { useState, useContext } from "react";
import "./styles/Register.css";
import axios from "../config/axiosConfig";
import { AuthContext } from "../stateContext/stateContext";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const data = {
    email: email,
    password: password,
    gender: gender,
    birthDate: birthDate,
    name: name,
  };

  const register = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setLoading(false);
      setError("Password must be at least 6 characters long");
      return;
    }

    axios
      .post(`${API_URL}/user/register`, data)
      .then((response) => {
        setLoading(false); //
        if (response.data.error) {
          setError(response.data.error);
        } else {
          console.log("Success");
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
      })
      .catch((err) => {
        setLoading(false); // Stop loading on error
        setError("Something went wrong. Please try again.");
        console.error(err);
      });
  };

  return (
    <div className="register">
      <div className="container">
        <p>Create an Account</p>
        <form onSubmit={register}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            name="gender"
            defaultValue=""
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>
              Gender
            </option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="date"
            placeholder="BirthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          ></input>
          <button>Register</button>
        </form>

        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};
