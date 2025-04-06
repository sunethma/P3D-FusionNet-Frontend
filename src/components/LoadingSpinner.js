import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin border-4 border-white border-t-[#2a5460] rounded-full w-16 h-16 mb-4"></div>
        <div className="text-white text-2xl font-bold bg-[#2a5460] p-4 rounded-lg">
          Generating 3D Model...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;