import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { ConState } from "../../context/ConProvider";
import { Avatar, Button } from "@mui/material";
import axios from "axios";
import Slider from "react-slick";
import Rating from "react-rating";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = ConState();
  const [result, setResult] = useState([]);
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

  const getWishlistedProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-wishlist/${user?.user?._id}`
      );
      if (data?.success) {
        setResult(data?.result);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getWishlistedProducts();
  });

  const handleRemove = async (pid) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-wishlist/${pid}`
      );
      if (data?.success) {
        toast({
          title: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        getWishlistedProducts();
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
  }

  return (
    <Layout title={"User Dashboard"}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "2rem",
            }}
          >
            <Avatar
              style={{ height: "12rem", width: "12rem" }}
              alt="Remy Sharp"
              src={user?.user?.pic}
            />
            <h2 style={{ marginTop: "1rem", textAlign: "center" }}>
              {user?.user?.name}
            </h2>
            <div>
              <Button onClick={()=>navigate("/dashboard/update-customer-profile")}>Edit Profile</Button>
              {/* <Button style={{ marginLeft: "3px" }}>Chats</Button> */}
            </div>
          </div>
        </div>
        <div style={{ padding: "0.1rem 10%" }}>
          <hr
            style={{
              height: "2px",
              width: "100%",
              height: "2px",
              backgroundColor: "black",
              border: "none",
            }}
          />
        </div>
        <div style={{ padding: "0 10%" }}>
          {result?.length > 0 && (
            <h3 style={{ textAlign: "center" }}>
              <span style={{ color: "#A6B1E1" }}>Wishlisted</span> Products
            </h3>
          )}
          {result?.length === 0 && (
            <div
              style={{
                textAlign: "center",
                height: "20h",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              No Products Wishlisted
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {result?.map((product) => {
              return (
                <div
                  className="card"
                  style={{ width: "18rem", margin: "1rem", cursor: "pointer" }}
                >
                  <Slider {...settings}>
                    {product?.product?.pics?.map((image, index) => (
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
                  <div
                    className="card-body d-flex flex-column mt-2 pb-0"
                    onClick={() =>
                      navigate(`/individual-product/${product.product._id}`)
                    }
                  >
                    <div style={{ display: "flex" }}>
                      <h5
                        className="card-title"
                        style={{ marginBottom: "8px" }}
                      >
                        {product.product.name.length > 10
                          ? `${product.product.name.slice(0, 10)}..`
                          : product.product.name}
                      </h5>
                      <p
                        style={{
                          marginBottom: "8px",
                          marginLeft: "auto",
                          minWidth: "3rem",
                          position: "relative",
                          display: "inline-block",
                          textDecoration: product.product.inoffer
                            ? "none"
                            : "none",
                        }}
                      >
                        Rs {product.product.price}
                        {product.product.inoffer && (
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
                    </div>
                    {product.product.inoffer === true ? (
                      <>
                        <div style={{ display: "flex" }}>
                          <p
                            style={{
                              marginBottom: "8px",
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                              background:
                                "linear-gradient(270deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)",
                              backgroundSize: "1400% 1400%",
                              color: "transparent",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              animation: "gradientAnimation 10s ease infinite",
                            }}
                          >
                            Inoffer
                          </p>
                          <style jsx>{`
                            @keyframes gradientAnimation {
                              0% {
                                background-position: 0% 50%;
                              }
                              50% {
                                background-position: 100% 50%;
                              }
                              100% {
                                background-position: 0% 50%;
                              }
                            }
                          `}</style>
                          <p
                            style={{
                              marginBottom: "8px",
                              marginLeft: "auto",
                              minWidth: "3rem",
                              color: "#A6B1E1",
                            }}
                          >
                            Rs {product.product.offerPrice}
                          </p>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="d-flex ">
                      <Rating
                        initialRating={product.product.rating}
                        readonly
                        fullSymbol={<FaStar size={24} color="#424874" />}
                        emptySymbol={<FaRegStar size={24} color="#A6B1E1" />}
                        placeholderSymbol={
                          <FaStarHalfAlt size={24} color="yellow" />
                        }
                      />
                      <p
                        className="ms-1"
                        style={{ marginBottom: "8px" }}
                      >{`(${parseFloat(product?.product?.rating).toFixed(
                        1
                      )})`}</p>
                    </div>
                    <p className="card-text" style={{ margin: "0" }}>
                      {product.product.description.length > 30
                        ? `${product.product.description.slice(0, 20)}...`
                        : product.product.description}
                    </p>
                    {product.product.available === true ? (
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
                  <Button
                    style={{ color: "red" }}
                    onClick={() => handleRemove(product._id)}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
