import React, { useCallback,useEffect, useRef, useState } from "react";
import { RetroGrid } from "./RetroGrid";
import "./RetroGrid.css";
import logo from "../logo/UI4U.png";
import { TbPrompt } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import WaitLoader from "./WaitLoader";

const Ui = () => {
  const location = useLocation();
  const userPrompt = location.state?.userPrompt || "Please Insert a Prompt...";
  const [isPreview, setIsPreview] = useState(true);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [generatedCSS, setGeneratedCSS] = useState("");
  const [generatedJS, setGeneratedJS] = useState("");
  const [preview, setPreview] = useState(true);
  const previewRef = useRef(null);
  const [codeSection, setCodeSection] = useState(true);

  const [isWaiting, setIsWaiting] = useState(true);

  console.log(isWaiting);
  console.log(generatedCode);
  console.log(error);
  console.log(preview);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const generateUI = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://ui4u.onrender.com/", {
      //const response = await fetch("http://localhost:8000/generate-ui", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response);
      const data = await response.json();
      const code = data.code;
      setGeneratedCode(code);

      const htmlMatch = code.match(
        /## HTML \(index\.html\)([\s\S]*?)## CSS \(style\.css\)/
      );
      const cssMatch = code.match(
        /## CSS \(style\.css\)([\s\S]*?)## JavaScript \(script\.js\)/
      );
      const jsMatch = code.match(/## JavaScript \(script\.js\)([\s\S]*)/);

      const htmlCode = htmlMatch
        ? htmlMatch[1].trim()
        : "<!-- HTML is not Present -->";
      const cssCode = cssMatch
        ? cssMatch[1].trim()
        : "<!-- CSS is not Present -->";
      const jsCode = jsMatch ? jsMatch[1].trim() : "<!-- JS is not Present -->";

      setGeneratedHTML(htmlCode);
      setGeneratedCSS(cssCode);
      setGeneratedJS(jsCode);

      console.log({ htmlCode, cssCode, jsCode });
    } catch (error) {
      setError("Error fetching data from server");
      console.error("Error:", error);
      if (error === "Candidate was blocked due to RECITATION") {
        toast.error("Due to Privacy Concerns Try Another Prompt...");
      }
    } finally {
      setIsLoading(false);
    }
   }, [userPrompt]);

  useEffect(() => {
    generateUI();
   }, [generateUI]);

  useEffect(() => {
    if (isPreview && previewRef.current) {
      // Clear the preview container before rendering new content
      previewRef.current.innerHTML = "";

      // Create a style element for CSS
      const style = document.createElement("style");
      style.textContent = generatedCSS;
      previewRef.current.appendChild(style);

      // Create a div element for HTML content
      const htmlContent = document.createElement("div");
      htmlContent.innerHTML = generatedHTML;
      previewRef.current.appendChild(htmlContent);

      // Create a script element for JS
      const script = document.createElement("script");
      script.type = "text/javascript";

      // Check if generatedJS is not empty before appending
      if (generatedJS) {
        try {
          // Validate and prepare the JS code
           script.textContent = generatedJS;
          // Append the script
          // previewRef.current.appendChild(script);
        } catch (error) {
          console.error("Error creating function from JS code:", error);
        }
      } else {
        console.warn("No JavaScript code provided to execute.");
      }
    } else if (!isPreview && previewRef.current) {
      // If isPreview is false (code section), clear the previewRef.current
      previewRef.current.innerHTML = "";
    }
  }, [generatedHTML, generatedCSS, generatedJS, isPreview]);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success("Code copied to clipboard!");
    });
  };
  return isLoading ? (
    <WaitLoader />
  ) : (
    <>
      <Toaster className="flex items-center justify-center" />
      {/* {top div} */}
      <div className="h-screen bg-black">
        {/* Logo at the top-left corner */}
        <Link to={"/"}>
          <div className="">
            <img
              src={logo}
              alt="logo"
              className="absolute top-2 left-2 w-32 h-auto"
            />
          </div>
        </Link>

        {/* User prompt centered */}

        <h1 className="text-white font-extralight  flex items-center  text-2xl  pt-12 pl-52">
          <TbPrompt className="text-white text-xl w-10 pr-2" /> {userPrompt}
        </h1>
        {/* {down div} */}
        <div className="ml-56 mt-10">
          {/* Buttons to toggle between Preview and Code */}
          <div className="flex mb-2">
            <button
              className={`py-2 px-4 rounded-lg transition-all duration-300 ${
                isPreview
                  ? "bg-slate-600 text-white shadow-lg"
                  : "bg-slate-800 text-white"
              }`}
              onClick={() => {
                setIsPreview(true);
                setPreview(true);
                setCodeSection(true);
              }}
            >
              Preview
            </button>
            <button
              className={`py-2 px-4 rounded-lg transition-all duration-300 ml-2 ${
                !isPreview
                  ? "bg-slate-600 text-white shadow-lg"
                  : "bg-slate-800 text-white"
              }`}
              onClick={() => {
                setIsPreview(false);
                setPreview(false);
                setCodeSection(false);
              }}
            >
              Code
            </button>
          </div>
        </div>
        <div className="w-[75%] bg-[#1E1E1E] mx-auto rounded-lg shadow-xl p-4 relative ">
          <div className="h-[380px] p-4 border border-gray-600 rounded-lg overflow-hidden ">
            {isPreview ? (
              codeSection && (
                <>
                  <div
                    ref={previewRef} // Use the ref to target the preview section
                    className=" text-lg bg-transparent h-full overflow-x-hidden overflow-y-hidden"
                  ></div>
                </>
              )
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {/* HTML Section */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold text-white">HTML:</h2>
                    <button
                      onClick={() => copyToClipboard(generatedHTML)}
                      className="text-white bg-blue-600 hover:bg-blue-500 rounded px-2 py-1"
                    >
                      Copy
                    </button>
                  </div>
                  <pre
                    className="text-white whitespace-pre-wrap overflow-y-auto"
                    style={{
                      maxHeight: "280px",
                      height: "280px",
                      overflowY: "auto",
                    }} // Fixed height for HTML
                  >
                    {generatedHTML}
                  </pre>
                </div>

                {/* CSS Section */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold text-white">CSS:</h2>
                    <button
                      onClick={() => copyToClipboard(generatedCSS)}
                      className="text-white bg-blue-600 hover:bg-blue-500 rounded px-2 py-1"
                    >
                      Copy
                    </button>
                  </div>
                  <pre
                    className="text-white whitespace-pre-wrap overflow-y-auto"
                    style={{
                      maxHeight: "280px",
                      height: "280px",
                      overflowY: "auto",
                    }} // Fixed height for CSS
                  >
                    {generatedCSS}
                  </pre>
                </div>

                {/* JavaScript Section */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold text-white">JS:</h2>
                    <button
                      onClick={() => copyToClipboard(generatedJS)}
                      className="text-white bg-blue-600 hover:bg-blue-500 rounded px-2 py-1"
                    >
                      Copy
                    </button>
                  </div>
                  <pre
                    className="text-white whitespace-pre-wrap overflow-y-auto"
                    style={{
                      maxHeight: "280px",
                      height: "280px",
                      overflowY: "auto",
                    }} // Fixed height for JS
                  >
                    {generatedJS}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Optional RetroGrid component at the bottom */}
        <RetroGrid />
      </div>
    </>
  );
};

export default Ui;
