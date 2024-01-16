import React, { useEffect } from "react";
import { API_URL, ChatState } from "../../context/ChatProvider";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const VerifyEmail = () => {
  console.log("verify email");
  const { user, setUser } = ChatState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const emailToken = searchParams.get("emailToken");
  const toast = useToast();
  console.log(emailToken);
  useEffect(() => {
    if (user?.isVerified) {
      navigate("/chats");
      return;
    }
    const verifyEmail = async () => {
      try {
        const res = await axios.post(`${API_URL}/api/user/verify-email`, {
          emailToken,
        });
        console.log(res);
        if (res.status === 200) {
          setUser(
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ ...user, ...res.data })
            )
          );
          console.log(user);
          toast({
            title: "Email Verified",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Email Verification Failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    };
    verifyEmail();
  }, []);
  return <div>VerifyEmail</div>;
};

export default VerifyEmail;
