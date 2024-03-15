import "./App.css";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home"
import Header from "./components/layout/Header";

import Footer from "./components/layout/Footer";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/login";
import Register from "./components/auth/register";

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center"/>
        <Header />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      
        <Footer />
      </div>
    </Router>
  );
}

export default App;