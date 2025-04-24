import React, { useState } from "react";

const UploadUI = ({ onUpload }) => {
  const [image1, setImage1] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const handleImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage1(URL.createObjectURL(file));
      if (typeof onUpload === 'function') {
        onUpload(file);
      } else {
        console.error("onUpload is not a function");
      }
    
      const formData = new FormData();
      formData.append("image", file);
    
      try {
        const response = await fetch("http://localhost:5000/extract-text", {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json"  
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        setExtractedText(data.extractedText);
      } catch (error) {
        console.error("Error extracting text:", error);
      }
    }
  };
  

  return (
    <div className="mt-10  m-auto w-[50vw] ">
        <div className="flex flex-col">
      <label htmlFor="imgg" className="cursor-pointer  px-5 py-5 bg-blue-500 rounded-md hover:bg-blue-600">
        Click here Upload file here:
      </label>
      <input
        onChange={handleImage}
        accept="image/*"
        type="file"
        id="imgg"
        className="hidden"
      />
      {image1 && <img src={image1} alt="preview" className="h-auto w-[100%] mt-10 rounded-lg border border-white" />}
      {extractedText && (
        <div className="mt-5 p-3 bg-gray-400 text-black  rounded-md">
          <h2 className="font-bold">Extracted Text:</h2>
          <p>{extractedText}</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default UploadUI;
