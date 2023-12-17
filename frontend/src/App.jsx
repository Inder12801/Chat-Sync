import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import HomePage from "./pages/HomePage";
import ChatsPage from "./pages/ChatsPage";
import { ChatState } from "./context/ChatProvider";

function App() {
  const { theme, user } = ChatState();
  return (
    <div className={user ? (theme ? "app" : "dark-app") : "app"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatsPage />} />
      </Routes>
    </div>
  );
}

export default App;
