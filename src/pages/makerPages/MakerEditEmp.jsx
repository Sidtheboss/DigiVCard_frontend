
import React from "react";
import LeftPanel from "../../components/MakerAuthLeftPanel"; // Import your existing Left Panel
import EditEmp from "../../components/EditEmp"; // Import the CommonDetailsContent
import { useUserContext } from '../../contexts/UserContext'; // Import the custom hook


const AnotherScreen = () => {
    const { userData } = useUserContext();
    const links = [
        { label: "Common details", path: "/MakerComDet" },
        { label: "File upload", path: "/MakerFileUpload" },
        { label: "Update employee details", path: "/MakerEditEmp" },
        { label: "Logout", path: "/" }
    ];
    return (
        <div className="flex h-screen">
            {/* Left Panel */}
            <LeftPanel userData={userData} links={links} />

            {/* Main Content */}
            <div className="flex-1 bg-white">
                <EditEmp navigateTo="/MakerEmp" />
            </div>
        </div>
    );
};

export default AnotherScreen;
