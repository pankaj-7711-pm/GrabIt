import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Textarea } from "@chakra-ui/react";
import { FormControlLabel, MenuItem, Switch } from "@mui/material";
import axios from "axios";
import { ConState } from "../../context/ConProvider";
import { Select } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const CreateProduct = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [pics, setPics] = useState([]);
  const [available, setAvailable] = useState(true);
  const [inoffer, setInoffer] = useState(false);
  const [offerPrice, setOfferPrice] = useState();
  const [category, setCategory] = useState();

  const toast = useToast();
  const navigate = useNavigate();
  const { user } = ConState();
  const [categories, setCategories] = useState([]);
  const [picLoading, setPicLoading] = useState(false);

  const handleAvailableChange = (event) => {
    setAvailable(event.target.checked);
  };

  const handleInOfferChange = (event) => {
    setInoffer(event.target.checked);
  };

  const removeImage = (index) => {
    const updatedPics = pics.filter((_, i) => i !== index);
    setPics(updatedPics);
  };

  useEffect(() => {
    console.log("After state update:", available);
  }, [available]);

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
        position: "top",
      });
      setPicLoading(false);
      return;
    }
  };

  useEffect(() => {
    console.log(pics);
  }, [pics]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-category/${user?.user?._id}`
      );
      setCategories(data?.category);
      console.log(categories);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async () => {
    if (!name || !price || !category || (inoffer === true && !offerPrice)) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (pics.length < 2) {
      toast({
        title: "There should be atleast two images of the product",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (description.length < 100) {
      toast({
        title: "Product description should be of atleast 100 characters",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    try {
      const { data } = await axios.post("/api/v1/product/create-product", {
        name,
        price,
        description,
        pics,
        available,
        inoffer,
        offerPrice,
        category,
      });
      if (data?.success) {
        toast({
          title: "Product created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        navigate("/dashboard/seller");
      }
    } catch (error) {
      toast({
        title: "Something wrong occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Layout>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="main-div-create-product"
          style={{
            minHeight: "80vh",
            padding: "3rem",
            width: "80%",
          }}
        >
          <h1 className="text-center">Create Product</h1>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                className="create-product-input"
                style={{ width: "60%" }}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <Textarea
                className="create-product-input"
                style={{
                  height: "40vh",
                  width: "60%",
                  border: "1px solid rgb(195, 194, 194)",
                }}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Write detailed description about your Product in more than 200 characters"
              />
              <div
                className="create-product-input"
                style={{
                  width: "60%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  style={{ width: "49%" }}
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                  style={{ width: "49%" }}
                  id="outlined-select-currency-native"
                  select
                  // label="Category"
                  // defaultValue="None"
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Select Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled selected hidden>
                    Category
                  </option>
                  {categories?.length === 0 && (
                    <option value="" disabled>
                      No categories
                    </option>
                  )}
                  {categories.map((option) => (
                    <option value={option._id}>{option.name}</option>
                  ))}
                </TextField>
              </div>

              <label
                className="btn btn-outline-secondary pics-div-create-product"
                style={{
                  width: "60%",
                  marginTop: "1rem",
                  // border: "1px solid rgb(195, 194, 194)",
                }}
              >
                {picLoading ? (
                  <>Loading...</>
                ) : (
                  <>
                    Upload images{" "}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => imagesUpload(e.target.files[0])}
                      hidden
                    />
                  </>
                )}
              </label>
              {pics.length !== 0 ? (
                <div
                  className="pics-div-create-product"
                  style={{
                    width: "60%",
                    backgroundColor: "white",
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "1rem",
                    padding: "1rem",
                    borderRadius: "7px",
                    border: "1px solid black",
                    position: "relative",
                  }}
                >
                  {pics?.map((pic, ind) => (
                    <div
                      key={ind}
                      style={{
                        position: "relative",
                        margin: "1rem 0.5rem",
                      }}
                    >
                      <IconButton
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          padding: "2px",
                          zIndex: 1,
                        }}
                        onClick={() => removeImage(ind)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                      <img
                        style={{
                          height: "6rem",
                          width: "6rem",
                          borderRadius: "5px",
                          display: "block",
                        }}
                        src={pic}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div>No images selected</div>
                </>
              )}

              <div
                className="create-product-input"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "60%",
                  justifyContent: "space-between",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={available}
                      onChange={handleAvailableChange}
                      // name="gilad"
                    />
                  }
                  label="Available"
                />
                <FormControlLabel
                  className="inoffer-input"
                  control={
                    <Switch
                      checked={inoffer}
                      onChange={handleInOfferChange}
                      // name="gilad"
                    />
                  }
                  label="Offer"
                  style={{ marginLeft: "auto" }}
                />
                {inoffer === true ? (
                  <>
                    <TextField
                      className="inoffer-div"
                      style={{ width: "49%" }}
                      id="outlined-basic"
                      label="Offer Price"
                      variant="outlined"
                      onChange={(e) => setOfferPrice(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      className="inoffer-div"
                      disabled
                      style={{ width: "49%" }}
                      id="outlined-basic"
                      label="Offer Price"
                      variant="outlined"
                    />
                  </>
                )}
              </div>
              <Button
                className="create-product-input"
                variant="contained"
                style={{ width: "60%" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
