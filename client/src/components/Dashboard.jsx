import React, { useEffect, useState } from "react";
import api from "../api";
import UserCard from "./UserCard";

const Dashboard = ({ user }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/get-users");
        setUsers(data.data);
      } catch (err) {
        alert("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-600 text-white"
      style={{
        background: "linear-gradient(to right, #1f2937, #4b5563)", // full-page background gradient
        paddingBottom: "40px", // space at the bottom for mobile view
      }}
    >
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Admin Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <UserCard key={user._id} user={user} setUsers={setUsers} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
