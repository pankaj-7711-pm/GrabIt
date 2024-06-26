import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ConState } from "../../context/ConProvider";
const UpdateProfileCustomer = () => {
  const toast = useToast();
  const { user, setUser } = ConState();
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "duon0scym");
      fetch("https://api.cloudinary.com/v1_1/duon0scym/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword || !phone) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    // console.log(name, email, password, pic);
    try {
      const { data } = await axios.put("/api/v1/auth/update-customer", {
        name,
        email,
        password,
        pic,
        phone,
      });
      // console.log(data);
      if (data?.success) {
        toast({
          title: "Update Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setUser({ ...user, user: data?.user });
        let ls = localStorage.getItem("userInform");
        ls = JSON.parse(ls);
        ls.user = data.user;
        localStorage.setItem("userInform", JSON.stringify(ls));
        setPicLoading(false);
        navigate("/dashboard/user");
        setPicLoading(false);
        // navigate("/login");
      } else {
        toast({
          title: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        // description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setPicLoading(false);
    }
  };

  useEffect(() => {
    setName(user?.user?.name);
    setEmail(user?.user?.email);
    setPhone(user?.user?.phone);
    setPic(user?.user?.pic);
  }, []);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{padding:"5%"}}>
          <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-2"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              value={phone}
              placeholder="Enter your Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              className="mb-2"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
                className="mb-2"
              />
              <InputRightElement width={"4.5rem"}>
                <Button h={"1.75rem"} size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Confirm password"
                onChange={(e) => setConfirmpassword(e.target.value)}
                className="mb-2"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="pic">
            <FormLabel>Upload your Picture</FormLabel>
            <Input
              type="file"
              p={1.5}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
              className="mb-2"
            />
          </FormControl>
          <Button
            colorScheme="blue"
            width={"100%"}
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={picLoading}
          >
            Update
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProfileCustomer;
