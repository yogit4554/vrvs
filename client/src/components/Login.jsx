import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/login", { email, password });
      setUser(data);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white p-6 rounded shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;