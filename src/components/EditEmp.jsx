import React, { useState, useEffect } from "react";
import { useUserContext } from '../contexts/UserContext'; // Import the custom hook
import {useNavigate} from 'react-router-dom';


const MainContent = () => {
    const { userData } = useUserContext(); // Access global user data
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (searchTerm.length >= 3) {
            setIsLoading(true);
            // Replace with your API URL
            fetch(`http://127.0.0.1:8000/search-emp?search_query=${searchTerm}&company_id=${userData?.company_id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Data : ", data)
                    setFilteredData(data); // Assuming the API returns an array of employees
                })
                .catch((error) => console.error("Error fetching data:", error))
                .finally(() => setIsLoading(false));
        } else {
            setFilteredData([]);
        }
    }, [searchTerm]);

    const handleUserClick = (common_name, profile_id) => {
        // Clear search query and results
        setSearchTerm("");
        setFilteredData([]);
    
        // Navigate with state
        navigate('/AdminEmp', { state: { common_name, profile_id } });
    };

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Corporate Module</h1>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search for Employees..."
                    className="border rounded-md w-full p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Employee Data List */}
            <div className="space-y-4">
                {isLoading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : filteredData.length > 0 ? (
                    filteredData.map((employee) => (
                        <div
                            key={employee.profile_id}
                            className="p-4 border rounded-md shadow-sm hover:shadow-md"
                            onClick={() => handleUserClick(employee.common_name, employee.profile_id)} // Attach the click handler here
                        >
                            <h2 className="text-lg font-semibold">
                                {employee.common_name}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {employee.designation}
                            </p>
                        </div>
                    ))
                ) : (
                    searchTerm.length >= 3 && (
                        <p className="text-gray-500">No employees found.</p>
                    )
                )}
            </div>
        </main>
    );
};

export default MainContent;
