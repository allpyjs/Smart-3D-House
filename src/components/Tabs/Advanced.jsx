import React from "react";

const parts = [
  { label: "All", value: "" },
  { label: "Floor", value: "floor" },
  { label: "Front Wall", value: "frontWall" },
  { label: "Back Wall", value: "backWall" },
  { label: "Left Wall", value: "leftWall" },
  { label: "Right Wall", value: "rightWall" },
  { label: "Roof Left", value: "roofLeft" },
  { label: "Roof Right", value: "roofRight" },
  { label: "Roof", value: "roof" },
  { label: "Walls", value: "walls" },
];

const Advanced = ({ onSelect, selected }) => {
  return (
    <div className="p-2 space-y-2">
      {parts.map(part => (
        <div key={part.value}>
          <input
            type="radio"
            name="part"
            value={part.value}
            checked={selected === part.value}
            onChange={() => onSelect(part.value)}
            className="mr-2"
          />
          <label>{part.label}</label>
        </div>
      ))}
    </div>
  );
};

export default Advanced;
