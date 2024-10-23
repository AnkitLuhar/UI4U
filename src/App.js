import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Ui from "./components/Ui";
import Loader from "./components/Loader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/home" element={<Home />} /> */}
      {/* <Route path="/home/ui" element={<Ui />} /> */}
      <Route path="/ui" element={<Ui />} />
    </Routes>
  );
};

export default App;
