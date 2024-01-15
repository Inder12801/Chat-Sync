import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import ChatLoader from "../Loader/ChatLoader";
import { saveImageToCloudinary } from "../../config/saveImageToCloudinary";
import axios from "axios";
import { API_URL } from "../../context/ChatProvider";

const ProfileModal = ({ user, setUser, children, theme }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatePic, setUpdatePic] = useState(user?.pic);
  const [updateName, setUpdateName] = useState(user?.name);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const toast = useToast();

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const handleUpdateUser = async () => {
    console.log("updateName->", updateName);

    if (updateName === user?.name && updatePic === user?.pic) {
      toast({
        title: "No changes made",
        description: "Please make some changes to update",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      setLoading(true);

      const picUrl = await saveImageToCloudinary(updatePic);
      console.log("picUrl->", picUrl);
      const updatedUser = await axios.put(
        `${API_URL}/api/user/update/${user?.email}`,
        { name: updateName, pic: picUrl },
        config
      );
      console.log(updatedUser);
      setUser({ ...user, ...updatedUser });
    } catch (error) {
      console.log("error->", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, []);
  if (loading) {
    return <ChatLoader />;
  }

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} onClick={onOpen} p={0}>
        {children}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={["xs", "md"]}>
        <ModalOverlay />
        <ModalContent
          bg={theme ? "white" : "gray.900"}
          color={theme ? "black" : "gray.200"}
        >
          <ModalHeader textAlign={"center"} fontSize={["sm", "lg"]}>
            {!editMode ? user?.name : ""}
            <Input
              type="text"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              outline={"none"}
              border={"none"}
              textAlign={"center"}
              display={editMode ? "block" : "none"}
              m={"auto"}
              focusBorderColor="pink.400"
              width={"80%"}
            />
          </ModalHeader>
          <ModalCloseButton color={"red"} onClick={() => setEditMode(false)} />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={"20px"}
          >
            <label htmlFor={editMode ? "updatePic" : ""}>
              <Image
                bgColor={"white"}
                src={user?.pic}
                alt={user?.name}
                width={["80px", "140px"]}
                height={["80px", "140px"]}
                borderRadius={"50%"}
                objectFit={"contain"}
                border={"5px solid #fe50ff"}
                htmlFor="updatePic"
              />
            </label>
            <Input
              type="file"
              display={"none"}
              name="updatePic"
              id="updatePic"
              accept="image/*"
              onChange={(e) => setUpdatePic(e.target.files[0])}
            />

            <Text fontSize={["sm", "lg"]}>Email : {user?.email}</Text>
          </ModalBody>

          <ModalFooter>
            {!editMode ? (
              <Button
                colorScheme="blue"
                mr={3}
                borderRadius={"20px"}
                variant={"solid"}
                onClick={() => {
                  setEditMode(true);
                }}
              >
                {<Text fontSize={["xs", "md"]}>Edit</Text>}
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                mr={3}
                borderRadius={"20px"}
                variant={"solid"}
                onClick={() => {
                  setEditMode(!editMode);
                  handleUpdateUser();
                }}
              >
                <Text fontSize={["xs", "md"]}>Save</Text>
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
