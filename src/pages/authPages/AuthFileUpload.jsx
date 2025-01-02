// src/pages/AdminAddUsers.jsx

import React from "react";
import LeftPanel from "../../components/MakerAuthLeftPanel"; // Import the LeftPanel component
import FileUpload from "../../components/FileUpload"; // Import the MainContent component

const AdminAddUsers = () => {
    const links = [
        { label: "Common details", path: "/AuthComDet" },
        { label: "File upload", path: "/AuthFileUpload" },
        { label: "Update employee details", path: "/AuthEditEmp" }
    ];
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
        <LeftPanel links={links} />


        {/* Main Content with custom button label */}
        <FileUpload
        submitLabel="Authorize" // Custom label for submit button
        onSubmit={handleSubmit}  // Submit function
        cancelLabel="Go Back"    // Custom label for cancel button
        onCancel={handleCancel}  // Cancel function
      />
        </div>
    );
};

export default AdminAddUsers;
