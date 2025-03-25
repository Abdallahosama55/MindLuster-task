import React from 'react';

interface ProgressBarProps {
  progress: number;
  bgColor: string;
  height?: number; // Optional prop
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, bgColor }) => {
  return (
    <div className="relative w-full sm:w-full">
      <div className={`overflow-hidden h-2 text-xs flex rounded bg-gray-200`}>
        <div
          style={{ width: `${progress}%`, backgroundColor: bgColor }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
        />
      </div>
    </div>
  );
};

export default ProgressBar;