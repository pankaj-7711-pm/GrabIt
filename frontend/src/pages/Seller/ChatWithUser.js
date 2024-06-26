import React, { useEffect, useRef, useState } from "react";
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
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ConState } from "../../context/ConProvider";




const ChatWithUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedChat, setSelectedChat] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [cid, setCid] = useState();
  const [messages, setMessages] = useState([]);
  const [senderRole, setSenderRole] = useState("Seller");
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

  const getChat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/chat/get-single-chat/${params.cid}`
      );
      if (data?.success) {
        setSelectedChat(data.chat);
        setCid(data?.chat?._id);
      }
    } catch (error) {}
  };

  const getMessages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/v1/chat/get-all-messages/${selectedChat._id}`
      );
      if (data?.success) {
        setMessages(data.messages);
        
      }
      setLoading(false);
    } catch (error) {}
  };


  const handleSend = async () => {
    if (!message) {
      toast({
        title: "Message should not be empty",
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

  // useEffect(() => {
  //   console.log(selectedChat);
  // }, [selectedChat]);

  useEffect(() => {
    getMessages();
  }, [selectedChat]);

  useEffect(() => {
    getChat();
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
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
        <h5>{selectedChat?.user?.name}</h5>
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
                      {m.senderRole === "Customer" &&
                        !isSameUser(messages, m, i) && (
                          <Tooltip
                            label={selectedChat?.user?.name}
                            placement="bottom-start"
                            hasArrow
                          >
                            <Avatar
                              mt="7px"
                              mr={1}
                              size="sm"
                              cursor="pointer"
                              name={selectedChat?.user?.name}
                              src={selectedChat?.user?.pic}
                            />
                          </Tooltip>
                        )}
                      <span
                        style={{
                          backgroundColor: `${
                            m.sender == user?.user?._id ? "#fff" : "#fff"
                          }`,
                          borderRadius: "20px",
                          padding: "5px 15px",
                          maxWidth: "75%",
                          marginLeft:
                            m.senderRole === "Seller"
                              ? "auto"
                              : !isSameUser(messages, m, i) === false
                              ? "36px"
                              : "0",
                          marginTop: !isSameUser(messages, m, i) ? 3 : 10,
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "auto",
          padding: "1rem 0",
        }}
      >
        <span
          style={{ color: "#424874", cursor: "pointer" }}
          onClick={() => navigate(`/`)}
        >
          GrabIt
        </span>
        &nbsp;| &nbsp;
        <span
          style={{ color: "#424874", cursor: "pointer" }}
          onClick={() => navigate(`/dashboard/messages-seller`)}
        >
          Back
        </span>
      </div>
    </div>
  );
};

export default ChatWithUser;
