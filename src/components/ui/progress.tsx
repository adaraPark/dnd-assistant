import React from "react";

interface ProgressBarProps {
  highestValue: number;
  currentValue: number;
}

const ProgressBar = ({ highestValue, currentValue }: ProgressBarProps) => {
  const progress = (currentValue / highestValue) * 100;

  // Determine the progress bar color
  const progressBarColor = progress < 40 ? "bg-red-500" : "bg-green-500"; // Red below 40%, green otherwise

  return (
    <div className="h-2 w-[200px] rounded-full bg-gray-300">
      <div
        className={`${progressBarColor} h-2 rounded-full`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
