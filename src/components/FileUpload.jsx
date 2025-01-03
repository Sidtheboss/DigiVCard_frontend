import React, { useState } from "react";
import { FiUpload } from "react-icons/fi"; // Upload Icon
import { IoClose } from "react-icons/io5"; // Close Icon
import Image from "../images/image_1.jpeg"; // Your logo image import
import { useUserContext } from '../contexts/UserContext'; // Import the custom hook

const FileUpload = ({ submitLabel, onSubmit, cancelLabel, onCancel, fileLable }) => {
  const { userData } = useUserContext(); // Access global user data
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Check if the selected file is an Excel file
    if (file && (file.name.endsWith(".xlsx") || file.name.endsWith(".xls"))) {
      setSelectedFile(file);
    } else {
      alert("Please select an Excel file (.xlsx or .xls).");
      setSelectedFile(null);
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  // Handle file upload
  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Send the file to the backend API
      fetch(`http://127.0.0.1:8000/upload-file?data=${userData?.company_id}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("File successfully uploaded:", data);
          onSubmit(); // Trigger the submit function if upload is successful
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      alert("Please select an Excel file before submitting.");
    }
  };

  return (
    <main className="flex-1 bg-gray-50 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Corporate Module</h1>
        <img
          src={Image} // Replace with your logo path
          alt="Logo"
          className="h-12"
        />
      </div>

      {/* File upload section */}
      <div className="flex flex-col h-5/6 items-center justify-center space-y-4">
        {/* Add New Employee Button */}
        <button
          className="bg-gray-600 text-white px-6 py-2 rounded-3xl flex items-center space-x-2"
          onClick={() => document.getElementById("fileInput").click()} // Trigger file input click
        >
          <span>{fileLable}</span>
          <FiUpload className="h-5 w-5" /> {/* Upload Icon */}
        </button>

        {/* Hidden file input */}
        <input
          id="fileInput"
          type="file"
          accept=".xlsx,.xls"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Display selected file name */}
        {selectedFile && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{selectedFile.name}</span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={handleRemoveFile} // Remove file
            >
              <IoClose className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            className="bg-blue-900 text-white px-6 py-2 rounded"
            onClick={handleFileUpload} // Upload the selected file
            disabled={!selectedFile} // Disable if no file is selected
          >
            {submitLabel}
          </button>
          <button
            className="bg-gray-300 text-black px-6 py-2 rounded"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </main>
  );
};
export default FileUpload;
