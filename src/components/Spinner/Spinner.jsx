import React from "react";

export default function Spinner({ size = "w-10 h-10", color = "border-indigo-500" }) {
  return (
    <div className={`flex justify-center items-center`}>
      <div className={`${size} border-4 border-gray-200 ${color} border-t-transparent rounded-full animate-spin`} />
    </div>
  );
}
