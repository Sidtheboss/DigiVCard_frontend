// src/pages/CommonDetails.jsx

import React from "react";
import { useUserContext } from '../../contexts/UserContext'; // Import the custom hook
import LeftPanel from "../../components/AdminLeftPanel"; // Import your existing Left Panel
import CommonDetailsContent from "../../components/CommonDets"; // Import the CommonDetailsContent

const CommonDetails = () => {
  const { userData } = useUserContext(); // Access global user data
  console.log(userData?.company_id); // Check if this prints a valid value

  const handleSubmit = async (data) => {
    console.log("Submitting Common Details:", data);
    console.log(userData?.company_id); // Check if this prints a valid value


    try {
      const response = await fetch(
        `http://127.0.0.1:8000/update-company?data=${userData?.company_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update company details");
      }

      const result = await response.json();
      console.log("Update Successful:", result);
      alert("Company details updated successfully!");
    } catch (error) {
      console.error("Error updating company details:", error);
      alert("Failed to update company details.");
    }
  };

  const handleCancel = () => {
    console.log("Cancelling");
    // Add your cancel functionality here
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <LeftPanel userData={userData} />

      {/* Main Content */}
      <CommonDetailsContent onSubmit={handleSubmit} onCancel={handleCancel} userData={userData} />
    </div>
  );
};

export default CommonDetails;
