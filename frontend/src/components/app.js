import React, { useEffect, useRef } from "react";
import NavBar from "./nav/navbar";
import MainPage from "./main/main";
import axios from "axios";

const App = () => {
  const googleKeyRef = useRef(null);

  useEffect(() => {
    const fetchGoogleKey = async () => {
      googleKeyRef.current = await axios.get("/api/google");
      const script = document.createElement("script");
      script.setAttribute("src", googleKeyRef.current.data);
      document.head.append(script);
    };
    fetchGoogleKey();
  }, []);

  return (
    <div>
      <NavBar />
      <MainPage />
    </div>
  );
};

export default App;
