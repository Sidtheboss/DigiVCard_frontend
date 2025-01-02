
import React from "react";
import LeftPanel from "../../components/AdminLeftPanel"; // Import your existing Left Panel
import EditEmp from "../../components/EditEmp"; // Import the CommonDetailsContent
import { useUserContext } from '../../contexts/UserContext'; // Import the custom hook


const AnotherScreen = () => {
    const { userData } = useUserContext(); // Access global user data
    
    return (
        <div className="flex h-screen">
            {/* Left Panel */}
            <LeftPanel userData={userData} />

            {/* Main Content */}
            <div className="flex-1 bg-white">
                <EditEmp />
            </div>
        </div>
    );
};

export default AnotherScreen;
