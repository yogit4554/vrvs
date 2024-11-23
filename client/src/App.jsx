import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserList from './components/UserManagement/UserList';
import CreateUser from './components/UserManagement/CreateUser';
import EditUser from './components/UserManagement/EditUser';
import Dashboard from './components/Dashboard';

const App = () => {
  // Get the current user from the Redux store
  const { userInfo } = useSelector((state) => state.userAuth);

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!userInfo ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!userInfo ? <Register /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        {userInfo && (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
          </>
        )}

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={userInfo ? "/" : "/login"} />} />
      </Routes>
    </div>
  );
};

export default App;