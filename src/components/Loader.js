import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items center py-3">
      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-yellow-700"></div>
    </div>
  );
};

export default Loader;
