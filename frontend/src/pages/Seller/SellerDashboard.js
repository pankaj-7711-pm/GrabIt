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
import { Button } from "@mui/material";




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

  return (
    <Layout>
      <div style={{ minHeight: "100vh", padding: "0 5%" }}>
        <div
          style={{
            width: "100%",
            minHeight: "100vh",
            // border: "1px solid rgb(195, 194, 194)",
            // backgroundColor: "white",
            // borderRadius: "5px",
          }}
        >
          <div style={{ padding: "5% 5% 1% 5%" }}>
            <div>
              <div
                className="seller-dash-img"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  padding: "0 15%",
                }}
              >
                <img
                  src={user?.user.pic}
                  alt=""
                  style={{
                    height: "19rem",
                    width: "19rem",
                    borderRadius: "5px",
                  }}
                />
                <div
                  className="seller-dash-details"
                  style={{
                    height: "19rem",
                    // width: "17rem",
                    borderRadius: "5px",
                    marginLeft: "1rem",
                    border: "1px solid rgb(195, 194, 194)",
                    padding: "1rem 2rem",
                  }}
                >
                  <p>{user?.user.name}</p>
                  <p>{user?.user.email}</p>
                  <p>{user?.user.phone}</p>
                  <p style={{ marginBottom: "0" }}>{user?.user.address}</p>
                  <p style={{ margin: "0" }}>{user?.user.city}</p>
                  <p style={{ margin: "0" }}>{user?.user.state}</p>
                  <p style={{ margin: "0" }}>{user?.user.pincode}</p>
                  <div className="mt-3 d-flex">
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
              <div style={{ padding: "1rem 15%" }}>
                {user?.user?.discription}
              </div>
              <div style={{ padding: "0 15%" }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#424874" }}
                >
                  Update Profile
                </Button>
                <Button
                  variant="contained"
                  className="seller-dash-btn"
                  style={{ marginLeft: "3px", backgroundColor: "#424874" }}
                  onClick={() => navigate("/dashboard/create-product")}
                >
                  Create Product
                </Button>
                <Button
                  variant="contained"
                  className="seller-dash-btn"
                  style={{ marginLeft: "3px", backgroundColor: "#424874" }}
                  onClick={() => navigate("/dashboard/create-category")}
                >
                  Create Category
                </Button>
                <Button
                  variant="contained"
                  className="seller-dash-btn"
                  style={{ marginLeft: "3px", backgroundColor: "#424874" }}
                >
                  Messages
                </Button>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <hr
              style={{
                width: "70%",
                height: "2px",
                backgroundColor: "black",
                border: "none",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
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
                  <div className="card-body mt-2 pb-0">
                    <div style={{ display: "flex" }}>
                      <h5 className="card-title">{product.name}</h5>
                      <p style={{ marginLeft: "auto" }}>Rs {product.price}</p>
                    </div>

                    <div className="d-flex ">
                      <Rating
                        initialRating={product.rating}
                        readonly
                        fullSymbol={<FaStar size={24} color="#424874" />}
                        emptySymbol={<FaRegStar size={24} color="#A6B1E1" />}
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
                    <p className="mt-2" style={{ color: "green", margin: "0" }}>
                      Available
                    </p>
                    <div className="mt-2" style={{ display: "flex" }}>
                      <p style={{ color: "#424874" }}>UPDATE</p>
                      <p style={{ color: "red", marginLeft: "auto" }}>DELETE</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
