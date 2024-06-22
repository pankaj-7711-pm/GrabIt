import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
// import Rating from "react-rating";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Modal,
  Rating,
} from "@mui/material";
import { ConState } from "../context/ConProvider";
import { Textarea } from "@chakra-ui/react";
import StarIcon from "@mui/icons-material/Star";

const SeperateProduct = () => {
  const [product, setProduct] = useState([]);
  const { user } = ConState();
  const [selectedImage, setSelectedImage] = useState();
  const [rating, setRating] = useState();
  const [message, setMessage] = useState();
  const [reviews, setReviews] = useState([]);
  const toast = useToast();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  const params = useParams();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-single-product/${params.pid}`
      );
      if (data?.success) {
        setProduct(data.product);
        setSelectedImage(data.product.pics[0]);
        // console.log(data)
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProduct();
  }, []);

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
    if (!message) {
      toast({
        title: "Message is required",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/v1/review/review-product/${params.pid}/${user?.user?._id}`,
        { rating, message }
      );
      if (data?.success) {
        getReviews();
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

  const getReviews = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/review/product-all-reviews/${params.pid}`
      );
      if (data?.success) {
        setReviews(data.reviews);
      }
    } catch (error) {}
  };

  const handleWishlist = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/product/wishlist/${params.pid}/${user?.user?._id}`
      );
      if (data?.success) {
        toast({
          title: data?.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: data?.message,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong in wishlisting",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useState(() => {
    getReviews();
  }, []);

  return (
    <Layout>
      <div style={{ padding: "2% 5% 2% 5%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{}}>
            <img
              style={{ height: "60vh", width: "100%" }}
              src={selectedImage}
              alt=""
            />
            <div
              style={{
                display: "flex",
                overflowX: "scroll",
                overflowY: "hidden",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE and Edge
              }}
            >
              <style>
                {`
                div::-webkit-scrollbar {
                    display: none;  // Safari and Chrome
                }
                `}
              </style>
              {product?.pics?.map((pic) => {
                return (
                  <img
                    onClick={() => setSelectedImage(pic)}
                    style={{
                      height: "5rem",
                      margin: "3px 3px 3px 0",
                      border:
                        selectedImage === pic ? "5px solid #424874" : "0px",
                      cursor: "pointer",
                    }}
                    src={pic}
                    alt=""
                  />
                );
              })}
            </div>
            <div style={{ margin: "2rem 0" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <h2 style={{ fontSize: "2rem" }}>{product.name}</h2>
                <Button style={{}} onClick={() => handleWishlist()}>
                  Add to Wishlist
                </Button>
              </div>
              <div className="d-flex mt-2">
                <Rating
                  name="half-rating-read"
                  value={`${product?.rating}`}
                  precision={0.1}
                  size="large"
                  readOnly
                />
                <p
                  className="ms-1 mt-1"
                  // style={{ fontSize: "1.1rem", marginTop: "2px" }}
                >{`(${parseFloat(product?.rating).toFixed(1)})`}</p>
              </div>
              <div className="" style={{ display: "flex", marginTop: "0px" }}>
                <p
                  style={{
                    marginBottom: "0",
                    // marginLeft: "auto",
                    minWidth: "3rem",
                    position: "relative",
                    display: "inline-block",
                    textDecoration: product.inoffer ? "none" : "none",
                  }}
                >
                  Rs {product.price}
                  {product.inoffer && (
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        width: "100%",
                        height: "1.5px",
                        backgroundColor: "#424874",
                        transform: "rotate(-10deg)",
                        transformOrigin: "center",
                      }}
                    ></span>
                  )}
                </p>
                {product?.inoffer === true && (
                  <p style={{ marginLeft: "1rem", marginBottom: "0" }}>
                    Rs {product.offerPrice}
                  </p>
                )}
              </div>
              {product.inoffer === true && <div>This product is in Offer.</div>}
              {product.available === true ? (
                <p
                  className="mt-2"
                  style={{
                    color: "green",
                    margin: "0",
                    marginBottom: "1rem",
                  }}
                >
                  Available
                </p>
              ) : (
                <>
                  <p
                    className="mt-2"
                    style={{
                      color: "gray",
                      margin: "0",
                      marginBottom: "1rem",
                    }}
                  >
                    Not Available
                  </p>
                </>
              )}
            </div>

            <div
              className="ds-sp-pro"
              style={{
                width: "120vh",
                border: "1px solid rgb(195, 194, 194)",
                marginBottom: "2rem",
              }}
            >
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  Description
                </AccordionSummary>
                <AccordionDetails style={{ textAlign: "justify" }}>
                  {product?.description}
                </AccordionDetails>
              </Accordion>
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <h3>Seller details</h3>
              <p>
                <span style={{ fontWeight: "500" }}>Shop name : </span>
                {product?.shop?.name}
              </p>
              <p>
                <span style={{ fontWeight: "500" }}>Mobile : </span>
                {product?.shop?.phone}
              </p>
              <p>
                <span style={{ fontWeight: "500" }}>Email : </span>
                {product?.shop?.email}
              </p>
              <p>
                Click{" "}
                <span
                  onClick={() => navigate(`/seller/${product?.shop?._id}`)}
                  style={{ color: "blue" }}
                  className="click-here-seperate-page"
                >
                  Here
                </span>{" "}
                to visit the Seller's page
              </p>
            </div>
            {user?.user?.isSeller === false && (
              <div>
                <p style={{ marginBottom: "0" }}>
                  Please review the product to help others.
                </p>
                <Button
                  style={{
                    backgroundColor: "#424874",
                    color: "white",
                    marginTop: "5px",
                  }}
                  onClick={handleOpen}
                >
                  Rate
                </Button>
              </div>
            )}
            <div className="my-3">
              {reviews.length > 0 && (
                <h3
                  style={{
                    textAlign: "center",
                    fontSize: "3rem",
                    color: "#424874",
                  }}
                >
                  Reviews
                </h3>
              )}
              {reviews.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "20vh",
                    fontSize: "1.2rem",
                    // color: "#424874",
                  }}
                >
                  No Review found
                </div>
              )}
            </div>
            <div
              className="ds-sp-pro"
              style={{
                padding: "2% 0 0 0",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "space-around",
                flexWrap: "wrap",
                width: "120vh",
              }}
            >
              {reviews?.map((q, index) => {
                return (
                  <div
                    className="quotes-main-div"
                    style={{
                      width: "30%",
                      marginBottom: "2rem",
                      padding: "1rem",
                      border: "1px solid rgb(195, 194, 194)",
                      borderRadius: "5px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div>
                        <Avatar
                          style={{ height: "2.8rem", width: "2.8rem" }}
                          alt="Remy Sharp"
                          src={q.user.pic}
                        />
                      </div>
                      <div style={{ marginLeft: "8px" }}>
                        <h5 style={{ margin: "0" }}>{q.user.name}</h5>
                        <p style={{ margin: "0", fontSize: "15px" }}>
                          <span
                            style={{
                              fontSize: "15px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <StarIcon
                              className="star-icon"
                              style={{ fontSize: "15px" }}
                            />
                            &nbsp;
                            <span
                              style={{
                                marginTop: "1.81px",
                                fontSize: "14px",
                              }}
                            >
                              {q.rating}
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                    <p style={{ fontSize: "15px", margin: "1rem 0 0 0" }}>
                      {q.message}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
              placeholder="Tell something about the product . . ."
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
    </Layout>
  );
};

export default SeperateProduct;
