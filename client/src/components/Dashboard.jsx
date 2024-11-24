import React, { useEffect, useState } from "react";
import api from "../api";
import UserCard from "./UserCard";

const Dashboard = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch users on component load
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

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Search Bar */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-full sm:w-2/3 lg:w-1/2">
            <input
              type="text"
              placeholder="Search by name or role or status"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none"
            />
            {searchQuery && (
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-400 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => setSearchQuery("")}
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* User Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user._id} user={user} setUsers={setUsers} />
          ))}

          {/* No results found */}
          {filteredUsers.length === 0 && (
            <p className="col-span-full text-center text-gray-200">
              No users found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
