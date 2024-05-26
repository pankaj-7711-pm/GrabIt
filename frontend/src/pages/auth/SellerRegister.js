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
import { Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);
// import { ConState } from "../../context/ConProvider";

const CustomerRegister = () => {
  const toast = useToast();
  // const { user, setUser } = ConState();
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState();
  const [rotp, setRotp] = useState();
  const [verified, setVerified] = useState(false);
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [address, SetAddress] = useState();
  const [pincode, setPincode] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [email, setEmail] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [pics, setPics] = useState([]);
  const [picLoading, setPicLoading] = useState(false);
  const [isSeller, setIsSeller] = useState(true);
  const [type, setType] = useState();

  const [page, setPage] = useState(0);

  const handleNext = () => {
    setPage((prevPage) => (prevPage + 1) % pages.length);
  };

  const handlePrev = () => {
    setPage((prevPage) => (prevPage - 1) % pages.length);
  };

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

  const imagesUpload = (pics) => {
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
          setPics([...pics, data.url.toString()]);
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

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword || !phone) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
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
        position: "bottom",
      });
      return;
    }
    // console.log(name, email, password, pic);
    try {
      const { data } = await axios.post("/api/v1/auth/register-customer", {
        name,
        email,
        password,
        pic,
        phone,
      });
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
  };

  const pages = [
    <Box key="page1" w="100%" h={"500px"}>
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
                <Button h={"1.75rem"} size="sm" onClick={handleClickEmail}>
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
      {verified === false ? (
        <>
          <Button
            colorScheme="blue"
            width={"100%"}
            style={{ marginTop: 15 }}
            // isLoading={picLoading}
            isDisabled
          >
            Verify your email to continue
          </Button>
        </>
      ) : (
        <>
          <Button
            colorScheme="blue"
            width={"100%"}
            style={{ marginTop: 15 }}
            onClick={handleNext}
            // isLoading={picLoading}
          >
            Continue
          </Button>
        </>
      )}
    </Box>,
    <Box key="page2" w="100%" h={"200px"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Shop name"
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
        />
      </FormControl>
      <FormControl id="owner-name" isRequired>
        <FormLabel>Owner name</FormLabel>
        <Input
          placeholder="Enter Owner name"
          onChange={(e) => setOwner(e.target.value)}
          className="mb-2"
        />
      </FormControl>

      <FormControl id="address" isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          placeholder="Enter Address"
          onChange={(e) => SetAddress(e.target.value)}
          className="mb-2"
        />
      </FormControl>
      <FormControl id="pincode" isRequired>
        <FormLabel>Pincode</FormLabel>
        <Input
          placeholder="Enter Pincode"
          onChange={(e) => setPincode(e.target.value)}
          className="mb-2"
        />
      </FormControl>
      <FormControl id="city" isRequired>
        <FormLabel>City</FormLabel>
        <Input
          placeholder="Enter City"
          onChange={(e) => setCity(e.target.value)}
          className="mb-2"
        />
      </FormControl>
      <FormControl id="state" isRequired>
        <FormLabel>State</FormLabel>
        <Input
          placeholder="Enter State"
          onChange={(e) => setState(e.target.value)}
          className="mb-2"
        />
      </FormControl>
      <Button onClick={handlePrev}>Prev</Button>
      <Button onClick={handleNext}>Next</Button>
    </Box>,
    <Box key="page3" w="100%" h={"200px"}>
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
      <Button onClick={handlePrev}>Prev</Button>
      <Button onClick={handleNext}>Next</Button>
    </Box>,
    <Box key="page4" w="100%">
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
      <Button onClick={handlePrev}>Prev</Button>
      <Button onClick={submitHandler}>Next</Button>
    </Box>,
  ];

  return (
    // <div style={{}}>
    <div style={{ width: "100%" }}>
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          width: "100%",
          height: "500px",
        }}
      >
        <AnimatePresence>
          <MotionBox
            key={page}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5 }}
            position="absolute"
            w="100%"
            h="100%"
          >
            {pages[page]}
          </MotionBox>
        </AnimatePresence>
      </div>
    </div>
    // </div>
  );
};

export default CustomerRegister;
