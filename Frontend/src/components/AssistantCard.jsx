import React from "react";

const AssistantCard = ({ image, selected, onClick, isCustom }) => (
  <div
    onClick={onClick}
    className={`rounded-xl shadow-lg cursor-pointer transition-all duration-200 border-4 ${
      selected ? "border-blue-500 scale-105" : "border-transparent hover:scale-105 hover:border-blue-300"
    } bg-gradient-to-tr from-blue-900 via-purple-900 to-blue-700 p-1`}
  >
    {isCustom ? (
      <img
        src={image}
        alt="Custom Assistant"
        className="rounded-lg w-full h-40 object-cover"
        draggable={false}
      />
    ) : (
      <img
        src={image}
        alt="Assistant"
        className="rounded-lg w-full h-40 object-cover"
        draggable={false}
      />
    )}
  </div>
);

export default AssistantCard;
