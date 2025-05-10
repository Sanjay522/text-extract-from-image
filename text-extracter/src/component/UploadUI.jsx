import React, { useState } from "react";
import Tesseract from "tesseract.js";

const UploadUI = () => {
  const [image1, setImage1] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage1(URL.createObjectURL(file));
      setLoading(true);

      Tesseract.recognize(URL.createObjectURL(file), "eng", {
        logger: (info) => console.log(info),
      })
        .then(({ data: { text } }) => {
          setExtractedText(text);
        })
        .catch((error) => {
          console.error("Error extracting text:", error);
          setExtractedText("Failed to extract text.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <div className="max-w-3xl w-full space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Image to Text Extractor
          </h2>
          <div className="flex justify-center">
            <label
              htmlFor="imgg"
              className="cursor-pointer px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              📁 Upload Image
            </label>
            <input
              onChange={handleImage}
              accept="image/*"
              type="file"
              id="imgg"
              className="hidden"
            />
          </div>

          {image1 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Image Preview:
              </h3>
              <img
                src={image1}
                alt="Preview"
                className="w-full rounded-md border border-gray-300 shadow-sm"
              />
            </div>
          )}

          {loading && (
            <div className="mt-6 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600 font-medium">
                Extracting text...
              </span>
            </div>
          )}

          {extractedText && !loading && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Extracted Text:
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">{extractedText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadUI;
