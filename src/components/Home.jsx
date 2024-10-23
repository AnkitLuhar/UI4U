import React, { useState } from "react";
import { RetroGrid } from "./RetroGrid";
import "./RetroGrid.css";
import logo from "../logo/UI4U.png";
import { BsArrowRightShort } from "react-icons/bs";
import { motion } from "framer-motion";
import { PiArrowElbowRight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [prompt, setPrompt] = useState(""); // State for user input
  const navigate = useNavigate(); // For navigation

  const handlePromptSubmit = () => {
    // Navigate to the Ui component with the prompt
    navigate("/ui", { state: { userPrompt: prompt } });
  };
  const handlePromptClick = (prompt) => {
    navigate("/ui", { state: { userPrompt: prompt } });
  };
  const sentence = "What can I help you?";
  const words = sentence.split(" ");
  const variants = {
    hidden: { opacity: 0, y: 20 }, // Start from below with opacity 0
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.5, // Delay for each word based on its index
      },
    }),
  };
  return (
    <div>
      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-black">
        <img
          src={logo}
          alt="logo"
          className="absolute top-2 left-2 w-32 h-auto"
        />
        <h1 className="z-10 mb-5 text-6xl text-transparent bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text drop-shadow-lg tracking-wide">
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={variants}
              initial="hidden"
              animate="visible"
              custom={index} // Pass the index as custom value for delay
              className="mr-4  z-10 text-7xl text-transparent bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text drop-shadow-lg tracking-wide mb-5" // Spacing between words
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <div className="flex items-center w-1/2 mt-4">
          <div className="relative flex-grow">
            <input
              type="text"
              className="w-full p-2 bg-black text-white border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
              placeholder="Type your UI prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)} // Update prompt state
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent flex items-center justify-center"
              onClick={handlePromptSubmit} // Handle button click
            >
              <BsArrowRightShort className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        {/* Additional prompts */}
        {/* Container for prompts */}
        <div className="mt-4 flex justify-center space-x-4">
          {/* {generate a todo} */}

          <div className="w-48 h-8 flex items-center justify-between text-white border border-dotted border-white bg-[#1E1E1E] rounded-xl p-2">
            <span className="text-sm">Generate a todo</span>
            <PiArrowElbowRight className="w-4 h-4 text-white text-sm" />
          </div>

          <div className="w-48 h-8 flex items-center justify-between text-white border border-dotted border-white bg-[#1E1E1E] rounded-xl p-2">
            <span className="text-sm">Generate a calculator</span>
            <PiArrowElbowRight className="w-4 h-4 text-white text-sm" />
          </div>

          <div className="w-48 h-8 flex items-center justify-between text-white border border-dotted border-white bg-[#1E1E1E] rounded-xl p-2">
            <span className="text-sm">Generate a Bank Card</span>
            <PiArrowElbowRight className="w-4 h-4 text-white text-sm" />
          </div>
        </div>

        <RetroGrid />
      </div>
    </div>
  );
};

export default Home;
