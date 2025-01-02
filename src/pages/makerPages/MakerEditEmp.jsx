
import React from "react";
import LeftPanel from "../../components/MakerAuthLeftPanel"; // Import your existing Left Panel
import EditEmp from "../../components/EditEmp"; // Import the CommonDetailsContent

const AnotherScreen = () => {
    const links = [
        { label: "Common details", path: "/MakerComDet" },
        { label: "File upload", path: "/MakerFileUpload" },
        { label: "Update employee details", path: "/MakerEditEmp" }
    ];
    return (
        <div className="flex h-screen">
            {/* Left Panel */}
            <LeftPanel links={links} />

            {/* Main Content */}
            <div className="flex-1 bg-white">
                <EditEmp />
            </div>
        </div>
    );
};

export default AnotherScreen;
