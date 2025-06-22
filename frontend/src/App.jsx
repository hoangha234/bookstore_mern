import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Footer from "./components/Footer";
import Header from "./components/Header"; 

const App = () => {
  return (
    <div className="min-h-screen flex flex-col animated-gradient text-gray-800">
      <Header /> {/* header appears at the top */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/details/:id" element={<ShowBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;

