import React, { useState, useEffect } from "react";
import Image from "../images/image_1.jpeg"; // Correct image import
import { FaTimes } from "react-icons/fa"; // For the "X" icon (you can install react-icons package)
import { useUserContext } from '../contexts/UserContext'; // Import the custom hook

const MainContent = () => {

  const { userData } = useUserContext(); // Access global user data

  const [users, setUsers] = useState([]); // Users state, starts empty
  const [originalUsers, setOriginalUsers] = useState([]); // Store the original state to revert if needed
  const [isLocked, setIsLocked] = useState(false); // Flag to lock inputs
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false); // Submit button state

  const handleSubmit = async () => {
    try {
      // Prepare the user data to be sent with roles assigned
      const usersToUpdate = users.map((user) => {
        let userRole = "user"; // Default role
        if (user.isAdmin) {
          userRole = "admin";
        } else if (user.isAuthorizer) {
          userRole = "authorizer";
        } else if (user.isMaker) {
          userRole = "maker";
        }
  
        return {
          username: user.username,
          email: user.email,
          role: userRole, // Include the determined role
        };
      });
  
      // Prepare the company data to be sent in the request body
      const companyData = {
        users: usersToUpdate,
      };
  
      // Send a POST request to the backend to update users
      const response = await fetch(`http://127.0.0.1:8000/update-user?data=${userData?.company_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData), // Send the company data as JSON
      });
  
      // Handle the response from the backend
      if (!response.ok) {
        throw new Error('Failed to update users');
      }
  
      const data = await response.json();
      console.log('Success:', data);
      // Optionally, you can show a success message or update the UI
    } catch (error) {
      console.error('Error:', error.message);
      // Optionally, handle errors and display error messages to the user
    }
  };
  
  

  const handleCancel = () => {
    // Handle cancel functionality here
    console.log("Action Cancelled");
    revertChanges();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Replace with your actual API URL and use the companyId in the request
        const response = await fetch(`http://127.0.0.1:8000/get-users?data=${userData?.company_id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        
        if (data && data.length > 0) {
          // Mapping role to checkbox states
          const mappedUsers = data.map(user => ({
            ...user,
            isAdmin: user.role === "admin", // Map admin role to isAdmin
            isMaker: user.role === "maker", // Map maker role to isMaker
            isAuthorizer: user.role === "authorizer", // Map authorizer role to isAuthorizer
          }));
          setUsers(mappedUsers);
          setOriginalUsers(mappedUsers); // Set the original data to revert if needed
        } else {
          setUsers([]); // If no users, set the state as empty
        }
      } catch (error) {
        setError(error.message); // Set the error message
      } finally {
        setIsLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchUsers();
  }, [userData?.company_id]);

  // Add a new row
  const addNewUser = () => {
    setUsers([
      ...users,
      {
        username: "",
        mailId: "", // Default to empty for new user
        isNew: true, // New user
        isAdmin: false,
        isMaker: false,
        isAuthorizer: false,
      },
    ]);
    setIsSubmitEnabled(true);
  };

  const updateUserCheckbox = (index, field) => {
    const updatedUsers = [...users];
    if (field === "isAuthorizer" && updatedUsers[index].isAuthorizer) {
      // If Authorizer is checked, uncheck Admin and Maker
      updatedUsers[index].isAdmin = false;
      updatedUsers[index].isMaker = false;
    }
    updatedUsers[index][field] = !updatedUsers[index][field];
    setUsers(updatedUsers);
    checkForChanges(updatedUsers);
  };

  // Update username or mailId in a specific row
  const updateUser = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
    checkForChanges(updatedUsers);
  };

  // Delete user row
  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, idx) => idx !== index);
    setUsers(updatedUsers);
    checkForChanges(updatedUsers);
  };

  // Lock the input fields by setting the lock state
  const lockFields = () => {
    setIsLocked(true);
  };

  // Revert to the original users list (before any changes)
  const revertChanges = () => {
    setUsers([...originalUsers]);
    setIsLocked(false);
    setIsSubmitEnabled(false);
  };

  // Check if there are changes between the current users and the original users
  const checkForChanges = (updatedUsers) => {
    const hasChanges = JSON.stringify(updatedUsers) !== JSON.stringify(originalUsers);
    setIsSubmitEnabled(hasChanges);
  };

  return (
    <main className="flex-1 bg-gray-50 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Corporate Admin Module</h1>
        <img
          src={Image} // Replace with your logo path
          alt="Logo"
          className="h-12"
        />
      </div>

      {/* Loading or Error Message */}
      {isLoading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="mt-8">
          {/* User Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left px-4 py-2">Username</th>
                <th className="text-left px-4 py-2">Mail ID</th>
                <th className="text-center px-4 py-2">Admin</th>
                <th className="text-center px-4 py-2">Maker</th>
                <th className="text-center px-4 py-2">Authorizer</th>
                <th className="text-center px-4 py-2"></th> {/* Action column for delete */}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="bg-blue-50">
                  <td className="flex items-center px-4 py-2">
                    <input
                      type="text"
                      value={user.username}
                      onChange={(e) =>
                        updateUser(index, "username", e.target.value)
                      }
                      className="border rounded px-2 py-1"
                      placeholder="Enter Username"
                      disabled={!user.isNew || isLocked} // Disable for existing users or if fields are locked
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="email" // Changed to email input type
                      value={user.email}
                      onChange={(e) => updateUser(index, "email", e.target.value)} // Update 'email' instead of 'mailId'
                      className="border rounded px-2 py-1"
                      placeholder="Enter Mail ID"
                      disabled={!user.isNew || isLocked} // Disable for existing users or if fields are locked
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={user.isAdmin}
                      onChange={() => updateUserCheckbox(index, "isAdmin")}
                      disabled={isLocked || user.isAuthorizer} // Disable if Authorizer is checked
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={user.isMaker}
                      onChange={() => updateUserCheckbox(index, "isMaker")}
                      disabled={isLocked || user.isAuthorizer} // Disable if Authorizer is checked
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={user.isAuthorizer}
                      onChange={() => updateUserCheckbox(index, "isAuthorizer")}
                      disabled={isLocked} // Disable if locked
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button onClick={() => deleteUser(index)}>
                      <FaTimes className="text-red-500 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
              {/* Add Row */}
              <tr>
                <td
                  onClick={addNewUser}
                  colSpan="6"
                  className="text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                >
                  <button
                    className="flex items-center justify-center"
                  >
                    <span className="text-lg font-bold">+</span> Add new user
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={handleSubmit}
          className={`px-6 py-2 rounded ${isSubmitEnabled ? "bg-blue-900 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          disabled={!isSubmitEnabled}
        >
          Submit {/* Dynamic Submit Label */}
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-black px-6 py-2 rounded"
        >
          Cancel {/* Dynamic Cancel Label */}
        </button>
      </div>
    </main>
  );
};

export default MainContent;
