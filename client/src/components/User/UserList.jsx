import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleCreate = () => {
    navigate('/create-user');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleCreate}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Create New User
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4 text-left">ID</th>
              <th className="border-b p-4 text-left">Name</th>
              <th className="border-b p-4 text-left">Email</th>
              <th className="border-b p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border-b p-4">{user.id}</td>
                <td className="border-b p-4">{user.name}</td>
                <td className="border-b p-4">{user.email}</td>
                <td className="border-b p-4">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;