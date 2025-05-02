

import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        <div className="text-xl text-white font-mono animate-pulse">
          <span className="text-blue-400">&lt;/&gt;</span> Loading...
        </div>
      </div>
    </div>
  );
};

export default Loader;
