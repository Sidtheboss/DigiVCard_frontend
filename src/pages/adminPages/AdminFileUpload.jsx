// src/pages/AdminAddUsers.jsx

import React from "react";
import LeftPanel from "../../components/AdminLeftPanel"; // Import the LeftPanel component
import {FileUpload} from "../../components/FileUpload"; // Import the MainContent component
import { useUserContext } from '../../contexts/UserContext'; // Import the custom hook


const AdminAddUsers = () => {
    const { userData } = useUserContext(); // Access global user data
    
    console.log("Component is rendering");
    const handleSubmit = () => {
        console.log("Submitting form for adding users");
        // Add your submit functionality here
    };
    const handleCancel = () => {
        console.log("Submitting form for adding users");
        // Add your submit functionality here
    };

    return (
        <div className="flex h-screen">
        {/* Left Panel */}
        <LeftPanel userData={userData} />


        {/* Main Content with custom button label */}
        <FileUpload
        submitLabel="Submit" // Custom label for submit button
        onSubmit={handleSubmit}  // Submit function
        cancelLabel="Go Back"    // Custom label for cancel button
        onCancel={handleCancel} 
        fileLable="Add New Employee" // Cancel function
      />
        </div>
    );
};

export default AdminAddUsers;
