import { Route, Router, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import React, { createContext, useContext, useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import ChatsPage from "./pages/ChatsPage";

const ChatContext = createContext();
export const API_URL = import.meta.env.VITE_SERVER_API_URL;

function App() {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showMyChats, setShowMyChats] = useState(false);
  const [theme, setTheme] = useState(false); // false - DarkMode
  const navigate = useNavigate();
  const value = {
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    notifications,
    setNotifications,
    showMyChats,
    setShowMyChats,
    theme,
    setTheme,
    API_URL,
  };

  // Get the current logged in user. If there is no user, redirect to login page.
  const checkUser = async () => {
    const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
      return;
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  // const { theme, user } = ChatState();
  return (
    <ChatContext.Provider value={value}>
      <div className={user ? (theme ? "app" : "dark-app") : "app"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chats" element={<ChatsPage />} />
        </Routes>
      </div>
    </ChatContext.Provider>
  );
}

export const ChatState = () => useContext(ChatContext);

export default App;
