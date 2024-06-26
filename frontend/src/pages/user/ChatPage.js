import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import ScrollableFeed from "react-scrollable-feed";
import { ConState } from "../../context/ConProvider";
import { useToast } from "@chakra-ui/react";

const ChatPage = () => {
  const params = useParams();
  const toast = useToast();
  const [seller, setSeller] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [cid, setCid] = useState();
  const [messages, setMessages] = useState([]);
  const [senderRole, setSenderRole] = useState("Customer");
  const { user } = ConState();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].senderRole === m.senderRole;
  };

  const getSeller = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-single-seller/${params.sid}`
      );
      if (data?.success) {
        setSeller(data?.seller);
      }
    } catch (error) {}
  };

  const getChat = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/chat/create-chat/${params.sid}`
      );
      if (data?.success) {
        setSelectedChat(data.chat);
        setCid(data?.chat?._id);
      }
    } catch (error) {}
  };

  const getMessages = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/chat/get-all-messages/${selectedChat._id}`
      );
      if (data?.success) {
        setMessages(data.messages);
      }
    } catch (error) {}
  };

  const handleSend = async () => {
    if (!message) {
      toast({
        title: "Message should be empty",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const { data } = await axios.post("/api/v1/chat/send-message", {
        message,
        cid,
        senderRole,
      });
      if (data?.success) {
        setMessage("");
        getMessages();
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    console.log(selectedChat);
  }, [selectedChat]);

  useEffect(() => {
    getMessages();
  }, [selectedChat]);

  useEffect(() => {
    getSeller();
    getChat();
  }, []);
  return (
    <Layout>
      <div
        style={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2% 2%",
        }}
      >
        <h5>{seller?.name}</h5>
        <Box
          display="flex"
          flexDir="column"
          justifyContent="flex-end"
          p={3}
          bg="#E8E8E8"
          w="50%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
          className="messages-container"
        >
          {loading ? (
            <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
          ) : (
            <div
              className="messages"
              style={{
                overflowY: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>
                {`
      .messages::-webkit-scrollbar {
        display: none;
      }
    `}
              </style>
              {/* <ScrollableChat /> */}
              <>
                {messages &&
                  messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                      {m.senderRole === "Seller" &&
                        isSameUser(messages, m, i) && (
                          <Tooltip
                            label={seller?.name}
                            placement="bottom-start"
                            hasArrow
                          >
                            <Avatar
                              mt="7px"
                              mr={1}
                              size="sm"
                              cursor="pointer"
                              name={seller?.name}
                              src={seller?.pic}
                            />
                          </Tooltip>
                        )}
                      <span
                        style={{
                          backgroundColor: `${
                            m.sender == user?.user?._id ? "#fff" : "#B9F5D0"
                          }`,
                          borderRadius: "20px",
                          padding: "5px 15px",
                          maxWidth: "75%",
                          marginLeft:
                            m.senderRole === "Customer"
                              ? "auto"
                              : isSameUser(messages, m, i) === false
                              ? "33px"
                              : "0",
                          marginTop: isSameUser(messages, m, i) ? 3 : 10,
                        }}
                      >
                        {m.message}
                      </span>
                    </div>
                  ))}
                <div ref={messagesEndRef} />
              </>
            </div>
          )}
          <FormControl isRequired mt={3}>
            <InputGroup>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <InputRightElement>
                <InputRightElement onClick={handleSend} cursor="pointer">
                  <ArrowForwardIcon />
                </InputRightElement>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
      </div>
    </Layout>
  );
};

export default ChatPage;
