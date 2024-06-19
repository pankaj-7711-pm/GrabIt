import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { Textarea, useSafeLayoutEffect, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Rating,
} from "@mui/material";
// import Rating from "react-rating";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Slider from "react-slick";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { ConState } from "../context/ConProvider";
import Modal from "@mui/material/Modal";
import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

const SeperateSeller = () => {
  const { user } = ConState();
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [seller, setSeller] = useState();
  const [categories, setCategories] = useState([]);
  const [rating, setRating] = useState();
  const [message, setMessage] = useState();

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    "@media (max-width: 480px)": {
      width: "90%",
    },
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getSeller = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-single-seller/${params.sid}`
      );
      if (data?.success) {
        setSeller(data.seller);
      }
    } catch (error) {}
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-category/${params.sid}`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {}
  };

  const handleSubmit = async () => {
    if (rating === undefined) {
      toast({
        title: "Rating is required",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/v1/review/review-seller/${params.sid}/${user?.user?._id}`,
        { rating, message }
      );
      if (data?.success) {
        toast({
          title: "Rated the seller successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        handleClose();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getSeller();
    getCategories();
  }, []);

  return (
    <Layout>
      <div style={{ minHeight: "100vh", padding: "0 5%" }}>
        <div
          style={{
            width: "100%",
            minHeight: "100vh",
          }}
        >
          <div style={{ padding: "5% 5% 1% 5%" }}>
            <div>
              <div style={{ padding: "0 15%" }}>
                <div className="seller-dash-img row">
                  <div
                    className="col p-0 m-0 col-lg-5 col-md-12"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={seller?.pic}
                      sx={{ width: 200, height: 200 }}
                    />
                    <div>
                      <h3 style={{ textAlign: "center", marginTop: "6px" }}>
                        {seller?.name}
                      </h3>
                      <div
                        className=" "
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {/* <Rating
                          initialRating={seller?.rating}
                          readonly
                          fullSymbol={<FaStar size={24} color="#424874" />}
                          emptySymbol={<FaRegStar size={24} color="#A6B1E1" />}
                          placeholderSymbol={
                            <FaStarHalfAlt size={24} color="yellow" />
                          }
                        /> */}
                        <Rating
                          name="half-rating-read"
                          value={`${seller?.rating}`}
                          precision={0.1}
                          // size="large"
                          readOnly
                        />
                        <p
                          className="ms-1"
                          // style={{ fontSize: "1.1rem", marginTop: "2px" }}
                        >{`(${seller?.rating})`}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="seller-dash-details col p-0 m-0 col-lg-7 col-md-12"
                    style={{ height: "19rem" }} // Set the height of the parent div
                  >
                    <Slider {...settings}>
                      {seller?.pics.map((image, index) => (
                        <div key={index} className="slider-image-wrapper">
                          <img
                            src={image}
                            className="card-img-top slider-image"
                            alt={`Slide ${index}`}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>

              <div className="row mt-2" style={{ padding: "1rem 15% 0 15%" }}>
                <Accordion
                  style={{
                    // backgroundColor: "#F4EEFF",
                    border: "1px solid rgb(195, 194, 194)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Description
                  </AccordionSummary>
                  <AccordionDetails>{seller?.discription}</AccordionDetails>
                </Accordion>
              </div>
              <div className="row" style={{ padding: "0.5rem 15%" }}>
                <Accordion
                  style={{
                    // backgroundColor: "#F4EEFF",
                    border: "1px solid rgb(195, 194, 194)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Address
                  </AccordionSummary>
                  <AccordionDetails>
                    <p style={{ marginBottom: "0" }}>{seller?.address}</p>
                    <p style={{ margin: "0" }}>{seller?.city}</p>
                    <p style={{ margin: "0" }}>{seller?.state}</p>
                    <p style={{ margin: "0" }}>{seller?.pincode}</p>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="row" style={{ padding: "0rem 15%" }}>
                <Accordion
                  style={{
                    // backgroundColor: "#F4EEFF",
                    border: "1px solid rgb(195, 194, 194)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Contact
                  </AccordionSummary>
                  <AccordionDetails>
                    <p style={{ margin: "0" }}>
                      <PhoneIcon /> {seller?.phone}
                    </p>
                    <p style={{ margin: "1rem 0 0 0" }}>
                      <EmailIcon /> {seller?.email}
                    </p>
                  </AccordionDetails>
                </Accordion>
              </div>
              {user?.user && user?.user?.isSeller === false && (
                <div
                  className="row "
                  style={{ padding: "0 15%", marginTop: "1rem" }}
                >
                  <div
                    className="button-group-seller-dashboard"
                    style={{ margin: "0", padding: "0" }}
                  >
                    <Button
                      className="seller-dashboard-btn"
                      variant="contained"
                      style={{
                        backgroundColor: "#424874",
                        marginBottom: "3px",
                      }}
                      onClick={() => handleOpen()}
                    >
                      Rate
                    </Button>

                    <Button
                      variant="contained"
                      className="seller-dashboard-btn"
                      style={{
                        marginLeft: "3px",
                        marginBottom: "3px",
                        backgroundColor: "#424874",
                        minWidth: "10rem",
                      }}
                      // onClick={() => navigate("/dashboard/messages-seller")}
                    >
                      Messages
                    </Button>
                  </div>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // padding: "0 15%",
                  margin: "1rem 0 1rem 0",
                }}
              >
                <hr
                  style={{
                    width: "100%",

                    height: "2px",
                    backgroundColor: "black",
                    border: "none",
                  }}
                />
              </div>
              {categories?.length !== 0 ? (
                <div>
                  <h2 style={{ textAlign: "center" }}>Categories</h2>
                  <div
                    style={{
                      padding: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {categories?.map((c, index) => {
                      return (
                        <div
                          className="create-category-hvr"
                          style={{
                            padding: "1rem 2rem",
                            minWidth: "5rem",
                            margin: "1rem",
                            border: "3px solid rgb(195, 194, 194)",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          {c.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    height: "20vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ textAlign: "center" }}>No Categories to Show</p>
                </div>
              )}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <p style={{ margin: "5px 0", fontSize: "1.2rem" }}>Rate</p>
                  <div
                    style={{
                      padding: "1rem 10px",
                      border: "1px solid rgb(195, 194, 194)",
                      borderRadius: "5px",
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                      size="large"
                    />
                  </div>
                  <Textarea
                    className=""
                    style={{
                      height: "10rem",
                      margin: "8px 0 0 0",
                      border: "1px solid rgb(195, 194, 194)",
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder="Tell something about the seller (Optional)"
                  />
                  <Button
                    style={{
                      backgroundColor: "#424874",
                      color: "white",
                      marginTop: "10px",
                    }}
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </Button>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SeperateSeller;
