import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AssistantCard from "../components/AssistantCard";
import assistant1 from "../assets/image1.png";
import assistant2 from "../assets/image2.jpg";
import assistant3 from "../assets/image4.png";
import assistant4 from "../assets/image5.png";
import assistant5 from "../assets/image6.jpeg";
import assistant6 from "../assets/image7.jpeg";
import assistant7 from "../assets/authBg.png";

const assistantImages = [
  assistant1,
  assistant2,
  assistant3,
  assistant4,
  assistant5,
  assistant6,
  assistant7,
];

const AssistantSelect = () => {
  const [selected, setSelected] = useState(null);
  const [customImage, setCustomImage] = useState(null);
  const [isCustom, setIsCustom] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
        setIsCustom(true);
        setSelected(assistantImages.length); // Mark as custom
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    navigate("/update_name", {
      state: {
        assistantImage: isCustom ? customImage : assistantImages[selected],
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-wide">
        Select your <span className="text-blue-400">Assistant Image</span>
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10 w-full max-w-4xl">
        {assistantImages.map((img, idx) => (
          <AssistantCard
            key={idx}
            image={img}
            selected={selected === idx}
            onClick={() => {
              setSelected(idx);
              setIsCustom(false);
            }}
          />
        ))}
        <div
          onClick={() => fileInputRef.current.click()}
          className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-500 bg-gray-800 cursor-pointer hover:border-blue-400 transition-all"
        >
          <span className="text-3xl text-gray-400">+</span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {/* Show selected image */}
      {(selected !== null || customImage) && (
        <div className="flex flex-col items-center mb-6">
          <span className="text-white mb-2">Selected:</span>
          <img
            src={isCustom ? customImage : assistantImages[selected]}
            alt="Selected Assistant"
            className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-lg"
          />
        </div>
      )}

      <button
        className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 ${
          selected !== null || customImage
            ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
        onClick={handleNext}
        disabled={selected === null && !customImage}
      >
        Next
      </button>
    </div>
  );
};

export default AssistantSelect;
