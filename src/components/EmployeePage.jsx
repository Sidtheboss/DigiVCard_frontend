import React, { useEffect, useState } from "react";
import Image from "../images/image_1.jpeg"; // Correct image import
import { useUserContext } from '../contexts/UserContext'; // Import the custom hook
import { useLocation } from "react-router-dom";

const EmployeePage = ({ onSubmit, onCancel }) => {
    const location = useLocation();
    const { profile_id } = location.state || {};
    const { userData } = useUserContext(); // Access global user data

    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [formData, setFormData] = useState({
        Emp_name: "",
        Emp_title: "",
        Emp_designation: "",
        Emp_qualification: "",
        Emp_phone: "",
        Emp_email: "",
        Emp_profile_id: ""
    });

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/profile-data?data=${profile_id}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch employee details");
                }

                const data = await response.json();
                setFormData({
                    Emp_name: data.common_name || "", // Map to Emp_name
                    Emp_title: data.profile_title || "", // Map to Emp_title
                    Emp_designation: data.designation || "", // Map to Emp_designation
                    Emp_qualification: data.qualification || "", // Map to Emp_qualification
                    Emp_phone: data.primary_phone || "", // Map to Emp_phone
                    Emp_email: data.email || "", // Map to Emp_email
                    Emp_profile_id: data.profile_id || ""
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (profile_id && userData?.company_id) {
            fetchEmployeeDetails();
        }
    }, [profile_id, userData?.company_id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <main className="flex-1 bg-gray-50 p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Corporate Module</h1>
                <img src={Image} alt="Logo" className="h-12" />
            </div>

            <h2 className="text-xl font-semibold mt-6">Employee Details</h2>

            {/* Form */}
            <div className="mt-8 grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2 text-gray-700">Employee Name</label>
                    <input
                        type="text"
                        name="Emp_name"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter Employee Name"
                        value={formData.Emp_name}
                        onChange={handleInputChange}
                        disabled={true}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-gray-700">Profile Title</label>
                    <input
                        type="text"
                        name="Emp_title"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter Profile Title"
                        value={formData.Emp_title}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-gray-700">Employee Designation</label>
                    <input
                        type="text"
                        name="Emp_designation"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter Employee Designation"
                        value={formData.Emp_designation}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-gray-700">Employee Qualification</label>
                    <input
                        type="text"
                        name="Emp_qualification"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter Employee Qualification"
                        value={formData.Emp_qualification}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-gray-700">Employee Phone Number</label>
                    <input
                        type="text"
                        name="Emp_phone"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter Phone Number"
                        value={formData.Emp_phone}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-gray-700">Employee Email</label>
                    <input
                        type="text"
                        name="Emp_email"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter Employee Email"
                        value={formData.Emp_email}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-center space-x-4">
                <button
                    className="bg-blue-900 text-white px-6 py-2 rounded"
                    onClick={() => onSubmit(formData)}
                >
                    Submit
                </button>
                <button className="bg-gray-300 text-black px-6 py-2 rounded" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </main>
    );
};

export default EmployeePage;
