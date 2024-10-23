import React from "react";
import "./RetroGrid.css"; // Import the CSS file for animations

export function RetroGrid({ angle = 65 }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-50"
      style={{ perspective: "200px", "--grid-angle": `${angle}deg` }} // Fixed template literal
    >
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{ transform: `rotateX(${angle}deg)` }} // Fixed template literal
      >
        <div
          className="absolute inset-0 bg-transparent [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw] animate-grid"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 0),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 0)
            `,
          }}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-black" />
    </div>
  );
}
