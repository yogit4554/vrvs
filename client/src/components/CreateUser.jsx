import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const [status, setStatus] = useState("Active");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register-user", { name, email, role, status });
      alert("User created successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to create user.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white p-6 rounded shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold">Create User</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full border px-3 py-2 rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full border px-3 py-2 rounded"
        >
          <option value="Viewer">Viewer</option>
          <option value="Editor">Editor</option>
          <option value="Manager">Manager</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="block w-full border px-3 py-2 rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;