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
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{
        background: "linear-gradient(to right, #1f2937, #4b5563)", // Gradient background
      }}
    >
      <form
        className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-4">
          <img
            src="../../public/logo.png" // Company logo
            alt="Company Logo"
            className="mx-auto w-24 mb-4"
          />
          <h2 className="text-3xl font-semibold text-white-800">Create New User</h2>
          <p className="text-gray-400 text-center text-sm">Fill out the form to add a new user to the system</p>
        </div>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;