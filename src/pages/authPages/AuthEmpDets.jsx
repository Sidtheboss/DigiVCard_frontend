// src/pages/CommonDetails.jsx

import React from "react";
import { useUserContext } from '../../contexts/UserContext'; // Import the custom hook
import LeftPanel from "../../components/MakerAuthLeftPanel"; // Import your existing Left Panel
import EmpAuthPage from "../../components/EmpAuthPage"; // Import the CommonDetailsContent
import {useNavigate} from 'react-router-dom';


const CommonDetails = () => {
    const links = [
        { label: "Common details", path: "/AuthComDet" },
        { label: "File upload", path: "/AuthFileUpload" },
        { label: "Update employee details", path: "/AuthEditEmp" },
        { label: "Logout", path: "/" }
    ];

    const { userData } = useUserContext(); // Access global user data
    console.log(userData?.company_id); // Check if this prints a valid value
    const navigate = useNavigate();


    const handleSubmit = () => {
        console.log("Authorising Employee Details");
    
        fetch(`http://127.0.0.1:8000/auth-employee?data=${userData?.company_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to authorize the company.");
            }
        })
        .then((data) => {
            console.log("Employee authentication status updated successfully:", data.message);
            // You can show a success message or perform further actions here
        })
        .catch((error) => {
            console.error("Error authorizing company:", error);
            // You can show an error message or handle it in the UI
        });
    };

    const handleCancel = () => {
        console.log("Cancelling");
        navigate('/AuthEditEmp')
    };
  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <LeftPanel userData={userData} links={links} />

      {/* Main Content */}
      <EmpAuthPage onSubmit={handleSubmit} onCancel={handleCancel} userData={userData} />
    </div>
  );
};

export default CommonDetails;
