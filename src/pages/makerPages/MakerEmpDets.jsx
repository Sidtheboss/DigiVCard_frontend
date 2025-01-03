// src/pages/CommonDetails.jsx

import React from "react";
import { useUserContext } from '../../contexts/UserContext'; // Import the custom hook
import LeftPanel from "../../components/MakerAuthLeftPanel"; // Import your existing Left Panel
import EmployeePage from "../../components/EmployeePage"; // Import the CommonDetailsContent
import {useNavigate} from 'react-router-dom';


const CommonDetails = () => {
  const links = [
    { label: "Common details", path: "/MakerComDet" },
    { label: "File upload", path: "/MakerFileUpload" },
    { label: "Update employee details", path: "/MakerEditEmp" },
    { label: "Logout", path: "/" }
  ];

  const { userData } = useUserContext(); // Access global user data
  console.log(userData?.company_id); // Check if this prints a valid value
    const navigate = useNavigate();


  const handleSubmit = async (data) => {
    console.log("Employee Common Details: ", data);
    try {
        const response = await fetch(
          `http://127.0.0.1:8000/update-emp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to update employee details");
        }
  
        const result = await response.json();
        console.log("Update Successful:", result);
        alert("Employee details updated successfully!");
      } catch (error) {
        console.error("Error updating employee details:", error);
        alert("Failed to update employee details.");
      }
  };

  const handleCancel = () => {
    console.log("Cancelling");
    navigate('/MakerEditEmp')
  };
  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <LeftPanel userData={userData} links={links} />

      {/* Main Content */}
      <EmployeePage onSubmit={handleSubmit} onCancel={handleCancel} userData={userData} />
    </div>
  );
};

export default CommonDetails;
