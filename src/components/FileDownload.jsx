import { FiDownload } from "react-icons/fi"; // Download Icon
import Image from "../images/image_1.jpeg"; // Correct image import

const FileDownload = ({ downloadUrl, onSubmit }) => {
  // Handle file download
  console.log("Download URL : ", downloadUrl)
  const handleFileDownload = () => {
    fetch(downloadUrl, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          const contentDisposition = response.headers.get("Content-Disposition");
          const filename = contentDisposition
            ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
            : "download.xlsx";
  
          return response.blob().then((blob) => ({
            blob,
            filename,
          }));
        } else {
          throw new Error("Failed to download the file.");
        }
      })
      .then(({ blob, filename }) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename; // Use filename from headers or default name
  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
        window.URL.revokeObjectURL(url); // Release memory
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
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
            onClick={handleFileDownload} // Trigger file download click
          >
            <span>Download Employee</span>
            <FiDownload className="h-5 w-5" /> {/* Upload Icon */}
          </button>
  
          {/* Submit and Cancel Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              className="bg-blue-900 text-white px-6 py-2 rounded"
              onClick={onSubmit}
              disabled={false} // Disable if no file is selected
            >
              Authorize
            </button>
            <button
              className="bg-gray-300 text-black px-6 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    );
};

export default FileDownload;