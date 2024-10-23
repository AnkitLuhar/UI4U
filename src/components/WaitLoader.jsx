import React from "react";
import { RingLoader } from "react-spinners";
const WaitLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <RingLoader color="#790909" size={150} speedMultiplier={1.5} />
    </div>
  );
};

export default WaitLoader;
