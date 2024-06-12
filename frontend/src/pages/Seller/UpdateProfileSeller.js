import React, { useEffect, useState } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormHelperText,
  AvatarGroup,
  Avatar,
  Select,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@chakra-ui/react";
import Layout from "../../components/layout/Layout";
import { ConState } from "../../context/ConProvider";
import { ShopTypes } from "../ShopType";

const MotionBox = motion(Box);
// import { ConState } from "../../context/ConProvider";

const UpdateProfileSeller = () => {
  const toast = useToast();
  // const { user, setUser } = ConState();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [discription, setDiscription] = useState("");
  const [address, SetAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState();
  const [pics, setPics] = useState([]);
  const [picLoading, setPicLoading] = useState(false);
  const [isSeller, setIsSeller] = useState(true);
  const [type, setType] = useState("");

  const { user,setUser} = ConState();

  const [page, setPage] = useState(0);

  useEffect(() => {
    setName(user?.user?.name);
    setOwner(user?.user?.owner);
    setDiscription(user?.user?.discription);
    SetAddress(user?.user?.address);
    setPincode(user?.user?.pincode);
    setPhone(user?.user?.phone);
    setCity(user?.user?.city);
    setState(user?.user?.state);
    setEmail(user?.user?.email);
    setPic(user?.user?.pic);
    setPics(user?.user?.pics);
    setType(user?.user?.type)
  },[])

  const handleNext = () => {
    setPage((prevPage) => (prevPage + 1) % pages.length);
  };

  const handlePrev = () => {
    setPage((prevPage) => (prevPage - 1) % pages.length);
  };


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

  const imagesUpload = (p) => {
    setPicLoading(true);

    if (p.type === "image/jpeg" || p.type === "image/png") {
      const data = new FormData();
      data.append("file", p);
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

  

  const submitHandler = async () => {
    setPicLoading(true);
    if (
      !name ||
      !owner ||
      !address ||
      !pincode ||
      !city ||
      !state ||
      !email ||
      !phone ||
      !pics.length || !password || !confirmpassword || !type
    ) {
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
    if (discription.length < 200) {
      toast({
        title: "Discription should be more than 200 characters",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
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
    // console.log(`${phone}, ${address}, ${city}`);
    try {
      const { data } = await axios.put("/api/v1/auth/update-seller", {
        name,
        owner,
        address,
        pincode,
        discription,
        phone,
        city,
        state,
        email,
        password,
        pic,
        pics,
        isSeller
      });
      // console.log(data);
      if (data?.success) {
        toast({
          title: "update Successful",
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
        navigate("/dashboard/seller");
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

  

  const pages = [
    <div className="abab">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          style={{ width: "20rem" }}
          className="update-seller-email"
          placeholder="Enter your Email"
          value={email}
          isDisabled
        />
      </FormControl>
      <FormControl id="phone" isRequired>
        <FormLabel>Phone</FormLabel>
        <Input
          placeholder="Enter your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-2"
          // style={{ width: "20rem" }}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={handleNext}
        // isLoading={picLoading}
      >
        Continue
      </Button>
    </div>,
    <div>
      <FormControl id="first-name" isRequired>
        <FormLabel>Shop name</FormLabel>
        <Input
          placeholder="Enter Shop name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 update-seller-email"
          style={{ width: "20rem" }}
        />
      </FormControl>
      <FormControl id="owner-name" isRequired>
        <FormLabel>Owner name</FormLabel>
        <Input
          placeholder="Enter Owner name"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="mb-2"
        />
      </FormControl>
      <FormControl id="shop-type" isRequired>
        <FormLabel>Shop type</FormLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mb-2"
        >
          <option value="" disabled>
            Select Shop type
          </option>
          {ShopTypes.map((shopType, index) => (
            <option key={index} value={shopType}>
              {shopType}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button
        colorScheme="blue"
        width={"49%"}
        style={{ marginTop: 15 }}
        onClick={handlePrev}
      >
        Prev
      </Button>
      <Button
        colorScheme="blue"
        width={"49%"}
        style={{ marginTop: 15, marginLeft: "2px" }}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>,
    <div>
      <FormControl id="address" isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          value={address}
          placeholder="Enter Address"
          onChange={(e) => SetAddress(e.target.value)}
          className="mb-2 update-seller-email"
          style={{ width: "20rem" }}
          // className="update-seller-email"
        />
      </FormControl>
      <FormControl id="pincode" isRequired>
        <FormLabel>Pincode</FormLabel>
        <Input
          value={pincode}
          placeholder="Enter Pincode"
          onChange={(e) => setPincode(e.target.value)}
          className="mb-2"
        />
      </FormControl>
      <FormControl id="city" isRequired>
        <FormLabel>City</FormLabel>
        <Input
          value={city}
          placeholder="Enter City"
          onChange={(e) => setCity(e.target.value)}
          className="mb-2"
        />
      </FormControl>
      <FormControl id="state" isRequired>
        <FormLabel>State</FormLabel>
        <Input
          value={state}
          placeholder="Enter State"
          onChange={(e) => setState(e.target.value)}
          className="mb-2"
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width={"49%"}
        style={{ marginTop: 15 }}
        onClick={handlePrev}
      >
        Prev
      </Button>
      <Button
        colorScheme="blue"
        width={"49%"}
        style={{ marginTop: 15, marginLeft: "2px" }}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>,
    <div>
      <FormControl id="pic" isRequired>
        <FormLabel>Profile picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          className="mb-2"
        />
      </FormControl>
      <Avatar size="md" src={pic} />
      <FormControl id="pics" style={{ marginTop: "1rem" }} isRequired>
        <FormLabel>Shop Images</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => imagesUpload(e.target.files[0])}
          className="mb-2"
        />
      </FormControl>

      <AvatarGroup size="md" max={3}>
        {pics.map((p) => {
          return <Avatar src={p} />;
        })}
      </AvatarGroup>
      <Button
        colorScheme="blue"
        width={"49%"}
        style={{ marginTop: 15 }}
        onClick={handlePrev}
      >
        Prev
      </Button>
      <Button
        colorScheme="blue"
        width={"49%"}
        style={{ marginTop: 15, marginLeft: "2px" }}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>,
    <div>
      <FormLabel>Description</FormLabel>
      <Textarea
        style={{ height: "40vh" }}
        onChange={(e) => setDiscription(e.target.value)}
        value={discription}
        placeholder="Write detailed description about your shop in more than 200 characters"
      />
      <Button
        colorScheme="blue"
        width={"49%"}
        style={{ marginTop: 15 }}
        onClick={handlePrev}
      >
        Prev
      </Button>
      <Button
        colorScheme="blue"
        width={"49%"}
        style={{ marginTop: 15, marginLeft: "2px" }}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>,
    <div>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 update-seller-email"
            style={{ width: "20rem" }}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password">
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={confirmpassword}
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
      <Button
        colorScheme="blue"
        width={"49%"}
        style={{ marginTop: 15 }}
        onClick={handlePrev}
      >
        Prev
      </Button>
      <Button
        colorScheme="blue"
        width={"49%"}
        style={{ marginTop: 15, marginLeft: "2px" }}
        onClick={submitHandler}
      >
        Update
      </Button>
    </div>,
  ];

  return (
    <Layout
    >
      <div
        style={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          flexWrap:"wrap",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <div
          className="update-seller-pages-main"
          style={{
            padding: "5rem 5rem",
            backgroundColor: "white",
            borderRadius: "5px",
            margin:"1rem 2rem"
          }}
        >
          <h2 className="update-seller-text" style={{marginBottom:"1rem"}}>Update Profile</h2>
          {pages[page]}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProfileSeller;
