import React from "react";
import LeftPanel from "../../components/AdminLeftPanel"; // Import the LeftPanel component
import MainContent from "../../components/AddUsers"; // Import the MainContent component
import { useUserContext } from '../../contexts/UserContext'; // Import the custom hook


const AdminAddUsers = () => {
    const { userData } = useUserContext(); // Access global user data
    
    console.log("Component is rendering with userData:", userData);
    
    console.log("Component is rendering");

    return (
        <div className="flex h-screen">
        {/* Left Panel */}
        <LeftPanel userData={userData} /> {/* Use the LeftPanel component */}

        {/* Main Content with custom button label */}
        <MainContent />
        </div>
    );
};

export default AdminAddUsers;
