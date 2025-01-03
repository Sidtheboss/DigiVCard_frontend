// src/pages/AdminAddUsers.jsx

import React from "react";
import LeftPanel from "../../components/MakerAuthLeftPanel"; // Import the LeftPanel component
import FileDownload from "../../components/FileDownload"; // Import the MainContent component
import { useUserContext } from '../../contexts/UserContext'; // Import the custom hook


const AdminAddUsers = () => {
    const { userData } = useUserContext();

    const links = [
        { label: "Common details", path: "/AuthComDet" },
        { label: "File download", path: "/AuthFileUpload" },
        { label: "Authorize employee details", path: "/AuthEditEmp" },
        { label: "Logout", path: "/" }
    ];

    console.log("Component is rendering");

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
            console.log("Company authentication status updated successfully:", data.message);
            // You can show a success message or perform further actions here
        })
        .catch((error) => {
            console.error("Error authorizing company:", error);
            // You can show an error message or handle it in the UI
        });
    };
    
    const handleCancel = () => {
        console.log("Submitting form for adding users");
        // Add your submit functionality here
    };

    return (
        <div className="flex h-screen">
            {/* Left Panel */}
            <LeftPanel userData={userData} links={links} />


            {/* Main Content with custom button label */}
            <FileDownload
            onSubmit = {handleSubmit}
            downloadUrl={`http://127.0.0.1:8000/download-profiles?company_id=${userData?.company_id}`}
            />
        </div>
    );
};

export default AdminAddUsers;
