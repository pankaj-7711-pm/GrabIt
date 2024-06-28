import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
// import Rating from "react-rating";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Pagination, Rating } from "@mui/material";
// import { Avatar, Rating } from "@mui/material";


const CategoryWiseProducts = () => {
  const [category, setCategory] = useState();
  const [products, setProducts] = useState([]);
  const [proCount, setProCount] = useState();
  const [page, setPage] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  
  const handleChange = (event, value) => {
    setPage(value);
  };
  
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
      const { data } = await axios.post(
        `/api/v1/product/category-wise-products/${params.cid}`,
        { page }
      );
      if (data?.success) {
        setProducts(data.products);
        setProCount(data.len);
      }
    } catch (error) {}
  };

  const getCategoryDetail = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-single-category/${params.cid}`
      );
      if (data?.success) {
        setCategory(data.category);
        getAllProducts();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCategoryDetail();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [page]);

  return (
    <Layout>
      <div style={{ padding: "2% 5% 2% 5%" }}>
        <h2
          className="category-wise-products-seller-name"
          style={{ fontSize: "4rem", textAlign: "center", fontWeight: "400" }}
        >
          {category?.shop?.name}
        </h2>
        <h4 style={{ textAlign: "center", margin: "1rem", fontWeight: "300", fontSize:"2rem" }}>
          {category?.name}
        </h4>
        {proCount === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "30vh",
              border: "1px solid black",
              marginTop: "2rem",
              borderRadius: "5px",
            }}
          >
            <p style={{textAlign:"center"}}>No product found for this Category.</p>
          </div>
        )}
        <div
          className="seller-dash-products-div"
          style={{
            display: "flex",
            flexWrap: "wrap",
            // padding: "0 15%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {products?.map((product) => {
            return (
              <div
                className="card"
                onClick={() => navigate(`/individual-product/${product._id}`)}
                style={{ width: "18rem", margin: "1rem", cursor: "pointer" }}
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
                    <h5 className="card-title" style={{ marginBottom: "8px" }}>
                      {product.name?.length > 10 ? (
                        <>{product.name.slice(0, 10)}...</>
                      ) : (
                        <>{product.name}</>
                      )}
                    </h5>
                    <p
                      style={{
                        marginBottom: "8px",
                        marginLeft: "auto",
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
                  </div>
                  {product.inoffer === true ? (
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
                          Rs {product.offerPrice}
                        </p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="d-flex ">
                    <Rating
                      style={{ margin: "1px 0 5px 0" }}
                      name="half-rating-read"
                      value={`${product.rating}`}
                      precision={0.1}
                      size="medium"
                      readOnly
                    />
                    <p
                      className="ms-1"
                      style={{ marginBottom: "8px", marginTop:"2px" }}
                    >{`(${parseFloat(product?.rating).toFixed(1)})`}</p>
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
                </div>
              </div>
            );
          })}
        </div>
        {proCount !== 0 && (
          <div
            style={{
              display: "flex",
              margin: "1rem",
              justifyContent: "center",
            }}
          >
            <Pagination
              // style={{ marginLeft: "auto" }}
              count={Math.ceil(proCount / 6)}
              variant="outlined"
              shape="rounded"
              className="custom-pagination"
              page={page}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryWiseProducts;
