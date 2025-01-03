
import React from "react";
import LeftPanel from "../../components/MakerAuthLeftPanel"; // Import your existing Left Panel
import EditEmp from "../../components/EditEmp"; // Import the CommonDetailsContent
import { useUserContext } from '../../contexts/UserContext'; // Import the custom hook


const AnotherScreen = () => {
    const { userData } = useUserContext();
    const links = [
        { label: "Common details", path: "/AuthComDet" },
        { label: "File download", path: "/AuthFileUpload" },
        { label: "Authorize employee details", path: "/AuthEditEmp" },
        { label: "Logout", path: "/" }
    ];
    return (
        <div className="flex h-screen">
            {/* Left Panel */}
            <LeftPanel userData={userData} links={links} />


            {/* Main Content */}
            <div className="flex-1 bg-white">
                <EditEmp navigateTo="/AuthEmp" />
            </div>
        </div>
    );
};

export default AnotherScreen;
