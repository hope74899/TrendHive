import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthToken";
import axios from "axios";
import baseURL from "../../baseurl";
import { toast } from "react-toastify";

const User = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ email: "", role: "" });

  const getAllUsers = async () => {
    try {
      if (!token) return;
      setLoading(true); // Start loading
      const response = await axios.get(`${baseURL}/api/user/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setUsers(response.data);
      } else {
        toast.error(response.data.message || "Failed to fetch users data.");
      }
    } catch (error) {
      console.error("Error fetching users data:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [token]);

  const removeUser = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!userConfirmed) return; // Exit if user cancels

    try {
      const response = await axios.delete(`${baseURL}/api/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        // Update users list directly after deletion
        setUsers((prevList) => prevList.filter((user) => user._id !== id));
      } else {
        toast.error(response.data.message || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting the user.");
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({ email: user.email, role: user.role });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(
        `${baseURL}/api/user/update/${selectedUser._id}`,formData);

      if (response.status === 200) {
        toast.success("User updated successfully");
        // Update the user list
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUser._id
              ? { ...user, email: formData.email, role: formData.role }
              : user
          )
        );
        closeModal();
      } else {
        toast.error(response.data.message || "Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("An error occurred while updating the user.");
    }
  };

  return (
    <div>
      <p className="mb-2 text-lg font-bold">All Users List</p>
      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {/* List table title */}
          <div className="hidden md:grid grid-cols-[1fr_1.5fr_2fr_1fr_1.5fr] items-center px-2 py-1 border bg-gray-100 text-sm font-semibold">
            <span>Image</span>
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span className="text-center">Actions</span>
          </div>

          {/* User list */}
          {users?.length === 0 ? (
            <p className="text-center text-gray-500">No users found.</p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="flex flex-col   md:grid md:grid-cols-[1fr_1.5fr_2fr_1fr_1.5fr] items-center gap-2 px-2 py-1 border text-sm"
              >
                <img
                  src="../blankProfile.png" // Dynamic image with fallback
                  alt={user.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <p>
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : "N/A"}
                </p>
                <p>{user.email || "N/A"}</p>
                <p>{user.role || "N/A"}</p>
                <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => removeUser(user._id)}
                  className="text-right md:text-center cursor-pointer text-sm font-semibold text-red-500 hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => openEditModal(user)}
                  className="text-right md:text-center cursor-pointer text-sm font-semibold text-green-500 hover:underline"
                >
                  Edit
                </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <div className="flex flex-col gap-4">
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border p-2 w-full rounded"
                />
              </label>
              <label>
                Role:
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="border p-2 w-full rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <div className="flex justify-end gap-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={updateUser}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
