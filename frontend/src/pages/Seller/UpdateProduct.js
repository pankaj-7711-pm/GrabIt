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
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
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

  const params = useParams();
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-single-product/${params.pid}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPics(data.product.pics);
      setAvailable(data.product.available);
      setInoffer(data.product.inoffer);
      setOfferPrice(data.product.offerPrice);
      setCategory(data.product.category._id);
    } catch (error) {
      // console.log(error);
      //   toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  const handleAvailableChange = (event) => {
    setAvailable(event.target.checked);
  };

  const handleInOfferChange = (event) => {
    setInoffer(event.target.checked);
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
    if (description.length < 200) {
      toast({
        title: "Product description should be of atleast 200 characters",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    try {
      const { data } = await axios.put(
        `/api/v1/product/update-product/${params.pid}`,
        {
          name,
          price,
          description,
          pics,
          available,
          inoffer,
          offerPrice,
          category,
        }
      );
      if (data?.success) {
        toast({
          title: "Product Updated successfully",
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
          <h1 className="text-center">Update Product</h1>
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
                value={name}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                focused
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
                  value={price}
                  focused
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                  style={{ width: "49%" }}
                  id="outlined-select-currency-native"
                  select
                  // label="Category"
                  // defaultValue="None"
                  value={category}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Select Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
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
              {pics.length !== 0 && (
                <div
                  className="pics-div-create-product"
                  style={{
                    width: "60%",
                    backgroundColor: "white",
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "1rem",
                    padding: "1rem",
                    // justifyContent: "space-evenly",
                    borderRadius: "7px",
                    border: "1px solid black",
                  }}
                >
                  {pics?.map((pic, ind) => {
                    return (
                      <img
                        style={{
                          height: "6rem",
                          width: "6rem",
                          margin: "1rem 0.5rem",
                          borderRadius: "5px",
                        }}
                        src={pic}
                        alt=""
                      />
                    );
                  })}
                </div>
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
                      value={offerPrice}
                      focused
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
                      value={""}
                      focused
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

export default UpdateProduct;
