// src/pages/CommonDetails.jsx

import React, {useState} from "react";
import LeftPanel from "../../components/MakerAuthLeftPanel"; // Import your existing Left Panel
import CommonDetailsContent from "../../components/CommonDets"; // Import the CommonDetailsContent
import { useUserContext } from '../../contexts/UserContext'; // Import the custom hook


const CommonDetails = () => {
    const { userData } = useUserContext();
    const links = [
        { label: "Common details", path: "/AuthComDet" },
        { label: "File download", path: "/AuthFileUpload" },
        { label: "Authorize employee details", path: "/AuthEditEmp" },
        { label: "Logout", path: "/" }
    ];

    const handleSubmit = () => {
        console.log("Authorising Company Details");
    
        fetch(`http://127.0.0.1:8000/auth-company?data=${userData?.company_id}`, {
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
            console.log("Company authentication status updated successfully:", data.message);
            // You can show a success message or perform further actions here
        })
        .catch((error) => {
            console.error("Error authorizing company:", error);
            // You can show an error message or handle it in the UI
        });
    };

    const handleCancel = () => {
        console.log("Cancelling");
        // Add your cancel functionality here
    };

    return (
        <div className="flex h-screen">
        {/* Left Panel */}
        <LeftPanel userData={userData} links={links} />

        {/* Main Content */}
        <CommonDetailsContent onSubmit={handleSubmit} onCancel={handleCancel} disabled={true} Lable="Authorise"  />
        </div>
    );
};

export default CommonDetails;
