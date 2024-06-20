import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import Rating from "react-rating";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { ShopTypes } from "./ShopType";
import { useNavigate } from "react-router-dom";
import { Quotes } from "./Quotes";
import { Avatar } from "@mui/material";

const divStyle = {
  backgroundImage: 'url("/landingpage.jpg")',
  minHeight: "90vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative", // Make sure this div is positioned relative
};

const HomePage = () => {
  const [sellers, setSellers] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const getAllSellers = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-all-sellers");
      if (data?.success) {
        setSellers(data?.sellers);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllSellers();
  }, []);

  return (
    <Layout title={"Welcome to GrabIt - your online store"}>
      <div style={{ backgroundColor: "#fff" }}>
        <div className="homepage-main-banner" style={divStyle}>
          <div style={{ marginTop: "5rem" }}>
            <h1 style={{ fontSize: "5rem" }}>
              Shop local, <span style={{ color: "#A6B1E1" }}>Online.</span>
            </h1>
            <p
              className="subheading-homepage"
              style={{
                textAlign: "center",
                color: "#424874",
                fontSize: "1.5rem",
              }}
            >
              Bringing your favorite stores to your fingertips.
            </p>
            <h1
              className="subheading-homepage tyui"
              style={{
                textAlign: "center",
                marginTop: "2rem",
                fontSize: "6rem",
              }}
            >
              GrabIt
            </h1>
            <p
              style={{
                textAlign: "center",
                // marginTop: "1rem",
                fontSize: "1.1rem",
              }}
              className="subheading-homepage"
            >
              Just Grab it before it is gone.
            </p>
            <div
              className="subheading-homepage-btn"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <button
                style={{
                  padding: "1rem",
                  backgroundColor: "#424874",
                  borderRadius: "30px",
                  width: "10rem",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  marginBottom: "10rem",
                }}
              >
                Get Started
                <div className="arrow-container ms-2">
                  <span className="arrow-tail"></span>
                  <span className="arrow-head"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#fff" }}>
          {/* Add your new section content here */}
          <div className="row m-0 ">
            <div
              className="col-lg-4 col-md-4 p-0 cfcf"
              style={{
                // minHeight: "30vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 className="featured-seller-text" >
                Our <span style={{ color: "#A6B1E1" }}>Top Sellers</span>
              </h2>
            </div>
            <div
              className="col-lg-8 col-md-8 p-0 top-sellers-main"
              style={{
                borderLeft: "10px solid #DCD6F7",
                borderBottom: "10px solid #DCD6F7",
                borderBottomLeftRadius: "10px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "1rem",
                minHeight: "60vh",
                flexWrap: "wrap",
                marginBottom: "1rem",
              }}
            >
              {sellers?.map((s) => {
                return (
                  <div>
                    <img
                      src={s.pic}
                      style={{
                        height: "10rem",
                        width: "10rem",
                        borderRadius: "5px",
                      }}
                      alt=""
                    />
                    <p
                      style={{ margin: "0", padding: "0", textAlign: "center" }}
                    >
                      {s.name}
                    </p>
                    <div
                      className=" "
                      style={{ display: "flex", justifyContent: "center", flexDirection:"column", alignItems:"center" }}
                    >
                      <Rating
                        initialRating={s.rating}
                        readonly
                        fullSymbol={<FaStar size={24} color="#424874" />}
                        emptySymbol={<FaRegStar size={24} color="#A6B1E1" />}
                        placeholderSymbol={
                          <FaStarHalfAlt size={24} color="yellow" />
                        }
                      />

                      <p className="ms-1" style={{textAlign:"center"}}>{`(${parseFloat(
                        s?.rating
                      ).toFixed(1)})`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ marginTop: "5rem" }}>
          <h2 style={{ fontSize: "5rem", textAlign: "center" }}>
            What <span style={{ color: "#A6B1E1" }}>We</span> Do
          </h2>

          <div className="row m-0 p-0 what-we-do-inner">
            <div
              className="col-lg-6 m-0"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <h4
                  style={{
                    textAlign: "center",
                    fontSize: "3rem",
                    fontWeight: "400",
                    color: "#424874",
                    margin: "2rem 0 2rem 0",
                  }}
                >
                  CUSTOMER
                </h4>
                <p className="text-what-we-do">
                  <span
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: "100%",
                      padding: " 1px 3px",
                    }}
                  >
                    <CheckRoundedIcon style={{ fontSize: "1.5rem" }} />
                  </span>{" "}
                  <span style={{ fontSize: "1.6rem" }}>
                    Local shops at your fingertips.
                  </span>
                </p>
                <p className="text-what-we-do">
                  <span
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: "100%",
                      padding: " 1px 3px",
                    }}
                  >
                    <CheckRoundedIcon style={{ fontSize: "1.5rem" }} />
                  </span>{" "}
                  <span style={{ fontSize: "1.6rem" }}>
                    Communication with seller is easier.
                  </span>
                </p>
                <p className="text-what-we-do">
                  <span
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: "100%",
                      padding: " 1px 3px",
                    }}
                  >
                    <CheckRoundedIcon style={{ fontSize: "1.5rem" }} />
                  </span>{" "}
                  <span style={{ fontSize: "1.6rem" }}>
                    Rate and Review products and sellers.
                  </span>
                </p>
              </div>
            </div>
            <div
              className="col-lg-6 m-0"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // borderLeft: "10px solid #DCD6F7",
              }}
            >
              <div>
                <h4
                  style={{
                    textAlign: "center",
                    fontSize: "3rem",
                    fontWeight: "400",
                    color: "#424874",
                    margin: "2rem 0 2rem 0",
                  }}
                >
                  SELLER
                </h4>
                <p className="text-what-we-do">
                  <span
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: "100%",
                      padding: " 1px 3px",
                    }}
                  >
                    <CheckRoundedIcon style={{ fontSize: "1.5rem" }} />
                  </span>{" "}
                  <span style={{ fontSize: "1.6rem" }}>
                    Make your shop reach all over the world.
                  </span>
                </p>
                <p className="text-what-we-do">
                  <span
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: "100%",
                      padding: " 1px 3px",
                    }}
                  >
                    <CheckRoundedIcon style={{ fontSize: "1.5rem" }} />
                  </span>{" "}
                  <span style={{ fontSize: "1.6rem" }}>
                    Make users aware of offers at your shop.
                  </span>
                </p>

                <p className="text-what-we-do">
                  <span
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: "100%",
                      padding: " 1px 3px",
                    }}
                  >
                    <CheckRoundedIcon style={{ fontSize: "1.5rem" }} />
                  </span>{" "}
                  <span style={{ fontSize: "1.6rem" }}>
                    Solve customers query online.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="homepage-main-banner"
          style={{
            padding: "5%",
            // backgroundColor: "#DCD6F7",
            // backgroundColor: "rgba(220, 214, 247, 0.5)",
            background:
              "linear-gradient(to bottom, rgba(220, 214, 247, 0.2), rgba(220, 214, 247, 0.8))",
            position: "relative",
          }}
        >
          <div>
            <h2
              className="cat-text"
              style={{
                fontSize: "5rem",
                textAlign: "center",
                color: "#424874",
              }}
            >
              Categories
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                alignItems: "space-around",
                minHeight: "40vh",
                marginTop: "1rem",
                // paddingBottom:"1rem",
                padding: "1% 5% 5rem 5%",
              }}
            >
              {ShopTypes.map((t, index) => {
                return (
                  <div
                    className="categories-homepage"
                    style={{
                      // minWidth: "12rem",
                      padding: "2rem",
                      border: "1px solid rgb(195, 194, 194)",
                      borderRadius: "15px",
                      margin: "2rem 1rem 2rem 0",
                      // color: "#424874",
                      fontSize: "1.4rem",
                      textAlign:"center"
                    }}
                    onClick={() => navigate(`/${t}`)}
                  >
                    {t}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ marginTop: "0rem" }}>
          <h2 className="quotes-text" style={{ fontSize: "5rem", textAlign: "center" }}>
            Quotes from <span style={{ color: "#A6B1E1" }}>happy</span> users
          </h2>
          <div
            style={{
              padding: "5%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "space-around",
              flexWrap: "wrap",
            }}
          >
            {Quotes.map((q, index) => {
              return (
                <div
                  className="quotes-main-div"
                  style={{
                    width: "30%",
                    marginBottom: "5rem",
                    padding: "1rem",
                    border: "1px solid rgb(195, 194, 194)",
                    borderRadius: "5px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div>
                      <Avatar alt="Remy Sharp" src={q.pics} />
                    </div>
                    <div style={{ marginLeft: "8px" }}>
                      <h5 style={{ margin: "0" }}>{q.name}</h5>
                      <p style={{ margin: "0", fontSize: "15px" }}>{q.role}</p>
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
    </Layout>
  );
};

export default HomePage;
