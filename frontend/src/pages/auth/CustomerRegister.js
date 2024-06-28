import React, { useState } from "react";
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
import OtpModal from "./OtpModal";
// import { ConState } from "../../context/ConProvider";

const CustomerRegister = () => {
  const toast = useToast();
  // const { user, setUser } = ConState();
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState();
  const [rotp, setRotp] = useState();
  const [verified, setVerified] = useState(false);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const handleClickEmail = async () => {
    if (!email || !emailRegex.test(email)) {
      toast({
        title: "Enter valid Email",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setOtpLoading(true);
    try {
      const { data } = await axios.post("/api/v1/auth/sendotp", { email });
      if (data?.success) {
        setOtp(data?.temp);
        setOtpSent(true);
        // alert(`Otp is ${data.temp}`);
      } else {
        toast({
          title: "Otp not Sent",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      setOtpLoading(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setOtpLoading(false);
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
      const { data } = await axios.post(
        "/api/v1/auth/register-customer",
        {
          name,
          email,
          password,
          pic,
          phone
        }
      );
      // console.log(data);
      if (data?.success) {
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        // localStorage.setItem("userInform", JSON.stringify(data));
        setPicLoading(false);
        navigate("/login");
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


  const setVerifiation = () => {
    setVerified(true);
  }

  return (
    <div className="customer-register-aa" style={{}}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <InputGroup>
          {verified === true || otpSent === true ? (
            <>
              <Input placeholder="Enter your Email" value={email} isDisabled />
            </>
          ) : (
            <>
              <Input
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputRightElement width={"4.5rem"}>
                <Button
                  h={"1.75rem"}
                  size="sm"
                  onClick={handleClickEmail}
                  isLoading={otpLoading}
                >
                  Verify
                </Button>
              </InputRightElement>
            </>
          )}
        </InputGroup>
        {otpSent === true && verified === false && (
          <>
            <div className="mb-2" style={{ display: "flex" }}>
              <FormHelperText style={{ color: "green" }}>
                OTP Sent <span>Successfully</span>.{" "}
              </FormHelperText>
              <OtpModal email={email} otp={otp} verified={setVerifiation}>
                <FormHelperText style={{ marginLeft: "5px", color: "blue" }}>
                  Enter OTP
                </FormHelperText>
              </OtpModal>
            </div>
          </>
        )}
        {otpSent === true && verified === true && (
          <>
            <FormHelperText className="mb-2" style={{ color: "green" }}>
              Email Verified Successfully
            </FormHelperText>
          </>
        )}
      </FormControl>
      <FormControl id="phone" isRequired>
        <FormLabel>Phone</FormLabel>
        <Input
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
      <FormControl id="pic" isRequired>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          className="mb-2"
        />
      </FormControl>
      {verified === false ? (
        <>
          <Button
            colorScheme="blue"
            width={"100%"}
            style={{ marginTop: 15, display:"flex", justifyContent:"center", flexWrap:"wrap" }}
            isLoading={picLoading}
            isDisabled
          >
            Verify your email
          </Button>
        </>
      ) : (
        <>
          <Button
            colorScheme="blue"
            width={"100%"}
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={picLoading}
          >
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
};

export default CustomerRegister;
