import { useState } from "react";
import { useAuth } from "../auth/AuthToken";
import { toast } from "react-toastify";
import baseURL from "../baseurl";
import axios from "axios";

const Profile = () => {
    const { user,setUser } = useAuth();
    const [editEmail, setEditEmail] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!user) {
        return <div className="text-gray-600 text-center py-4">No User Information Available</div>;
    }

    const { _id, firstName, lastName, email, isVerified } = user;

    const handleEditEmail = () => {
        setEditEmail(true);
        setNewEmail(email);
    };

    const handleCancelEdit = () => {
        setEditEmail(false);
        setNewEmail("");
        setError(null);
    };

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
        setError(null);
    };

  const handleSubmitEmailChange = async () => {
        if (!newEmail || newEmail.trim() === "") {
          setError("Email cannot be empty");
          return;
        }
        if (newEmail === email) {
            toast.warn("Email is same as old email");
            handleCancelEdit();
            return;
        }

    try {
        setLoading(true);
        const response = await axios.put(`${baseURL}/api/user/update/${_id}`, {
            email:newEmail
          });
          if (response.status === 200) {
                toast.success(response.data.message);
                setUser(response.data.user)
            // Optionally update the user object in auth context
            // if using context update function
              handleCancelEdit();
            }
        } catch (err) {
            console.error("Email update failed", err);
            setError("Failed to update email. Please try again.");
            toast.error("Email update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
       <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8 p-4">
            <div className="flex items-center justify-center mb-6">
                <img
                    src="./blankProfile.png"
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover mr-4"
                />
                <h2 className="text-2xl font-semibold text-gray-800">{`${firstName} ${lastName}`}</h2>
            </div>

            <div className="px-4 pb-4">
                {!editEmail ? (
                  <div>
                    <div className="mb-4">
                        <p className="text-gray-700 text-base">
                            Email: <span className="font-medium">{email}</span>
                        </p>
                    </div>
                    <button
                         onClick={handleEditEmail}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                    >
                        Update Email
                    </button>
                    </div>
                   ) : (
                    <div>
                      <div className="mb-4">
                        <input
                            type="email"
                            value={newEmail}
                            onChange={handleEmailChange}
                            placeholder="New email"
                            className="border rounded px-3 py-2 w-full mb-2 focus:outline-none focus:ring focus:border-blue-300"
                         />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                      </div>

                       <div className="flex justify-end space-x-2">
                             <button
                            onClick={handleSubmitEmailChange}
                                disabled={loading}
                            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                 >
                                {loading ? "Updating..." : "Save"}
                                 </button>
                                 <button
                                      onClick={handleCancelEdit}
                                      disabled={loading}
                                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                                >
                                      Cancel
                                </button>
                        </div>
                   </div>
              )}

                <div className="mt-4 text-center">
                    {isVerified ? (
                        <span className="text-green-600 bg-green-100 px-3 py-1 rounded text-sm">Verified</span>
                    ) : (
                        <span className="text-red-600 bg-red-100 px-3 py-1 rounded text-sm">Not Verified</span>
                    )}
                </div>
            </div>
      </div>
    );
};

export default Profile;