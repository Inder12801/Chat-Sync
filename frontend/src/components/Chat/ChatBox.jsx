import React from "react";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
import { ChatState } from "../../App";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, showMyChats } = ChatState();
  return (
    <Box
      // width={"69%"}
      p={3}
      // m={2}
      height={["100%", "97%"]}
      borderRadius={"20px"}
      display={[showMyChats ? "none" : "inline", "inline"]}
      // className="div-shadow"
      flex={2}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
