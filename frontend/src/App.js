import "./App.css";
import React, { useState } from "react";

import { BrowserRouter as Router, Routes } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Toaster } from "react-hot-toast";

import useUserRoutes from "./components/routes/userRoutes";
import useAdminRoutes from "./components/routes/adminRoutes";
import Chatbot from "./components/admin/ChatBot";
import ButtonComponent from "./components/admin/ButtonComponent";

function App() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();
  const [showMain, setShowMain] = useState(false);

  // if click once, show the chatbot, if click again, hide the chatbot, and so on
const handleClick = () => {
    setShowMain(!showMain);
}

  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        <div className="container">
          <ButtonComponent handleClick={handleClick} />
              {showMain && <Chatbot/>}

          <Routes>
            {userRoutes}
            {adminRoutes}
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;