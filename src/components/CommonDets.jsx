// src/components/CommonDetailsContent.jsx

import React, { useEffect, useState } from "react";
import Image from "../images/image_1.jpeg"; // Correct image import
import { useUserContext } from '../contexts/UserContext'; // Import the custom hook

const CommonDetailsContent = ({ onSubmit, onCancel }) => {
    const { userData } = useUserContext(); // Access global user data
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [formData, setFormData] = useState({
        company_name: "",
        description: "",
        company_subname: "",
        title: "",
        website_url: "",
    }); // Initial form state

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/get-company?data=${userData?.company_id}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch company details");
                }

                const data = await response.json();
                setFormData({
                    company_name: data.company_details.company_name || "",
                    description: data.company_details.description || "",
                    company_subname: data.company_details.company_subname || "",
                    title: data.company_details.title || "",
                    website_url: data.company_details.website_url || "",
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (userData?.company_id) {
            fetchCompanyDetails();
        }
    }, [userData?.company_id]);

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

            <h2 className="text-xl font-semibold mt-6">Common Details</h2>

            {/* Form */}
            <div className="mt-8 grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2 text-gray-700">Profile Title Corp</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter Profile Title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-gray-700">Entity Logo</label>
                    <div className="border border-gray-300 p-4 rounded flex items-center justify-center">
                        <span className="text-gray-500">Upload</span>
                        <input type="file" className="hidden" />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 text-gray-700">Entity Name</label>
                    <input
                        type="text"
                        name="company_name"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter Entity Name"
                        value={formData.company_name}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-gray-700">Entity Description</label>
                    <textarea
                        name="description"
                        className="w-full p-2 border border-gray-300 rounded h-24"
                        placeholder="Enter Description"
                        value={formData.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-2 text-gray-700">Entity Subname</label>
                    <input
                        type="text"
                        name="company_subname"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter Entity Subname"
                        value={formData.company_subname}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-gray-700">Website</label>
                    <input
                        type="text"
                        name="website_url"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter Website URL"
                        value={formData.website_url}
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

export default CommonDetailsContent;
