import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ConState } from "../../context/ConProvider";

const CustomerLogin = () => {
  const [show, setShow] = useState(false);
    const [password, setPassword] = useState();
    const { user, setUser } = ConState();
  const [email, setEmail] = useState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      

      const { data } = await axios.post("/api/v1/auth/login-customer", {
        email,
        password,
      });
      if (data?.success) {
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setUser({
          ...user,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("userInform", JSON.stringify(data));
        setLoading(false);
        navigate("/");
      } else {
        toast({
          title: data?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{width:"16rem"}}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup >
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // style={{ width: "100%" }}
            />
            <InputRightElement width={"4.5rem"}>
              <Button h={"1.75rem"} size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="blue"
          width={"100%"}
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default CustomerLogin;
