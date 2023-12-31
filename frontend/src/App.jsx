import { Route, Router, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import React, { createContext, useContext, useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import ChatsPage from "./pages/ChatsPage";
import { ChatState } from "./context/ChatProvider";

function App() {
  const { theme } = ChatState();

  return (
    <div className={!theme ? "dark-app" : "app"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatsPage />} />
      </Routes>
    </div>
  );
}

export default App;
