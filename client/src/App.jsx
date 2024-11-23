import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import CreateUser from "./components/CreateUser";
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [user, setUser] = useState(null);

  // Check if the user is already logged in when the app initializes
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Restore user state
    }
  }, []);

  const handleUserLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Persist user state
  };

  const handleUserLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear persisted user state
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header user={user} onLogout={handleUserLogout} />
        <Routes>
          <Route path="/" element={<Login setUser={handleUserLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/create-user" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;