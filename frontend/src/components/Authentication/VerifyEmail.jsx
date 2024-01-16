import React, { useEffect } from "react";
import { API_URL, ChatState } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { user } = ChatState();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyEmail = async () => {
      if (user?.isVerified) {
        navigate("/chats");
      }
      try {
        const res = await axios.post(`${API_URL}/verify-email`, {
          emailToken: user?.emailToken,
        });
        console.log(res);
        if (res.status === 200) {
          setUser(
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ ...user, ...res.data })
            )
          );
          navigate("/chats");
          return;
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };
    verifyEmail();
  }, [user]);
  return <div>VerifyEmail</div>;
};

export default VerifyEmail;
