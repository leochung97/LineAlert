import React, { useEffect } from "react";
import NavBar from "./nav/navbar";
import MainPage from "./main/main";
import axios from 'axios'

const App = () => {
  let googleKey;

  useEffect(() => {
    const fetchGoogleKey = async () => {
       googleKey = await axios.get('/api/google')
        const script = document.createElement('script'); 
        script.setAttribute('src', googleKey.data);
        document.head.append(script);
    }

    fetchGoogleKey();
  }, []);

  return (
    <div>
      <NavBar />
      <MainPage />
    </div>
  )
};

export default App;