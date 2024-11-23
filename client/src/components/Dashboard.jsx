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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user._id} user={user} setUsers={setUsers} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;