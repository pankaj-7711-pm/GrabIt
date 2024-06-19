import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { ConState } from "../../context/ConProvider";
// import { Button } from "@chakra-ui/react";
import StarRatingComponent from "react-star-rating-component";
import Rating from "react-rating";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";



const SellerDashboard = () => {
  const { user, setUser } = ConState();
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  const toast = useToast();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  



  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${user?.user?._id}`
      );
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${pid}`
      );
      if (data?.success) {
        toast({
          title: "Product Deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        getAllProducts();
      } else {
        toast({
          title: "Error in deleting product",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Something Went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const confirmDelete = (p) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      handleDelete(p);
    }
  };

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
                      src={user?.user.pic}
                      sx={{ width: 200, height: 200 }}
                    />
                    <div>
                      <h3 style={{ textAlign: "center", marginTop: "6px" }}>
                        {user?.user.name}
                      </h3>
                      <div
                        className=" "
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Rating
                          initialRating={user?.user.rating}
                          readonly
                          fullSymbol={<FaStar size={24} color="#424874" />}
                          emptySymbol={<FaRegStar size={24} color="#A6B1E1" />}
                          placeholderSymbol={
                            <FaStarHalfAlt size={24} color="yellow" />
                          }
                        />
                        <p className="ms-1">{`(${user?.user.rating})`}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="seller-dash-details col p-0 m-0 col-lg-7 col-md-12"
                    style={
                      {
                        height: "19rem",
                        // width: "60%",
                      }
                    }
                  >
                    <Slider {...settings}>
                      {user?.user.pics.map((image, index) => (
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

              {/* <div style={{ padding: "1rem 15%" }}>
                {user?.user?.discription}
              </div> */}
              <div className="row mt-4" style={{ padding: "1rem 15% 0 15%" }}>
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
                  <AccordionDetails>{user?.user?.discription}</AccordionDetails>
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
                    <p style={{ marginBottom: "0" }}>{user?.user.address}</p>
                    <p style={{ margin: "0" }}>{user?.user.city}</p>
                    <p style={{ margin: "0" }}>{user?.user.state}</p>
                    <p style={{ margin: "0" }}>{user?.user.pincode}</p>
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
                      <PhoneIcon /> {user?.user.phone}
                    </p>
                    <p style={{ margin: "1rem 0 0 0" }}>
                      <EmailIcon /> {user?.user.email}
                    </p>
                  </AccordionDetails>
                </Accordion>
              </div>
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
                    style={{ backgroundColor: "#424874", marginBottom: "3px" }}
                    onClick={() => navigate("/dashboard/update-profile")}
                  >
                    Update Profile
                  </Button>
                  <Button
                    variant="contained"
                    className="seller-dashboard-btn"
                    // className="mb-2"
                    style={{
                      backgroundColor: "#424874",
                      marginLeft: "3px",
                      marginBottom: "3px",
                    }}
                    onClick={() => navigate("/dashboard/create-product")}
                  >
                    Create Product
                  </Button>
                  <Button
                    variant="contained"
                    className="seller-dashboard-btn"
                    // className="mb-2"
                    style={{
                      backgroundColor: "#424874",
                      marginLeft: "3px",
                      marginBottom: "3px",
                    }}
                    onClick={() => navigate("/dashboard/create-category")}
                  >
                    Create Category
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
                    onClick={() => navigate("/dashboard/messages-seller")}
                  >
                    Messages
                  </Button>
                </div>
              </div>
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
              {products?.length !== 0 ? (
                <div>
                  <h2 style={{ textAlign: "center" }}>Products</h2>
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
                  <p style={{ textAlign: "center" }}>No Products to Show</p>
                </div>
              )}

              <div
                className="seller-dash-products-div"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  // padding: "0 15%",
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                {products?.map((product) => {
                  return (
                    <div
                      className="card"
                      style={{ width: "18rem", margin: "1rem" }}
                    >
                      <Slider {...settings}>
                        {product.pics.map((image, index) => (
                          <div key={index}>
                            <img
                              src={image}
                              className="card-img-top"
                              alt={`Slide ${index}`}
                              style={{ height: "140px", objectFit: "cover" }}
                            />
                          </div>
                        ))}
                      </Slider>
                      <div className="card-body d-flex flex-column mt-2 pb-0">
                        <div style={{ display: "flex" }}>
                          <h5 className="card-title">{product.name}</h5>
                          <p style={{ marginLeft: "auto", minWidth: "3rem" }}>
                            Rs {product.price}
                          </p>
                        </div>

                        <div className="d-flex ">
                          <Rating
                            initialRating={product.rating}
                            readonly
                            fullSymbol={<FaStar size={24} color="#424874" />}
                            emptySymbol={
                              <FaRegStar size={24} color="#A6B1E1" />
                            }
                            placeholderSymbol={
                              <FaStarHalfAlt size={24} color="yellow" />
                            }
                          />
                          <p className="ms-1">{`(${product.rating})`}</p>
                        </div>
                        <p className="card-text" style={{ margin: "0" }}>
                          {product.description.length > 30
                            ? `${product.description.slice(0, 20)}...`
                            : product.description}
                        </p>
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
                        <div
                          className="main-div"
                          style={{ display: "flex", marginTop: "auto" }}
                        >
                          <p
                            style={{ color: "#424874", cursor: "pointer" }}
                            onClick={() =>
                              navigate(
                                `/dashboard/update-product/${product._id}`
                              )
                            }
                          >
                            UPDATE
                          </p>
                          <p
                            style={{
                              color: "red",
                              marginLeft: "auto",
                              cursor: "pointer",
                            }}
                            onClick={() => confirmDelete(product._id)}
                          >
                            DELETE
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {products?.length !== 0 && (
                <div style={{ display: "flex" }}>
                  <Pagination
                    style={{ marginLeft: "auto" }}
                    count={Math.ceil(products?.length / 6)}
                    variant="outlined"
                    shape="rounded"
                    className="custom-pagination"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
