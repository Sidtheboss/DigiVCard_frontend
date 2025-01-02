// src/pages/CommonDetails.jsx

import React from "react";
import LeftPanel from "../../components/MakerAuthLeftPanel"; // Import your existing Left Panel
import CommonDetailsContent from "../../components/CommonDets"; // Import the CommonDetailsContent

const CommonDetails = () => {
    const links = [
        { label: "Common details", path: "/AuthComDet" },
        { label: "File upload", path: "/AuthFileUpload" },
        { label: "Update employee details", path: "/AuthEditEmp" }
    ];
    const handleSubmit = () => {
        console.log("Submitting Common Details");
        // Add your submit functionality here
    };

    const handleCancel = () => {
        console.log("Cancelling");
        // Add your cancel functionality here
    };

    return (
        <div className="flex h-screen">
        {/* Left Panel */}
        <LeftPanel links={links} />

        {/* Main Content */}
        <CommonDetailsContent onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
    );
};

export default CommonDetails;
