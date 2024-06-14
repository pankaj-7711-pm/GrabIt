import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import Rating from "react-rating";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const divStyle = {
  backgroundImage: 'url("/landingpage.jpg")',
  minHeight: "90vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative", // Make sure this div is positioned relative
};

const HomePage = () => {
  const [sellers, setSellers] = useState([]);

  const getAllSellers = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-all-sellers");
      if (data?.success) {
        setSellers(data?.sellers);
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAllSellers();
  }, [])
  

  return (
    <Layout title={"Welcome to GrabIt - your online store"}>
      <div style={{backgroundColor:"#fff"}}>
        <div className="homepage-main-banner" style={divStyle}>
          <div style={{ marginTop: "5rem" }}>
            <h1 style={{ fontSize: "5rem" }}>
              Shop local, <span style={{ color: "#A6B1E1" }}>Online.</span>
            </h1>
            <p
              style={{
                textAlign: "center",
                color: "#424874",
                fontSize: "1.5rem",
              }}
            >
              Bringing your favorite stores to your fingertips.
            </p>
            <h1
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
            >
              Just Grab it before it is gone.
            </p>
            <div
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
                  marginBottom:"10rem"
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
          <div className="row m-0">
            <div
              className="col-lg-4 col-md-4 p-0"
              style={{
                minHeight: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 className="featured-seller-text">
                Our <span style={{ color: "#A6B1E1" }}>Top Sellers</span>
              </h2>
            </div>
            <div
              className="col-lg-8 col-md-8 p-0"
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
                marginBottom:"1rem"
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
                    <p style={{margin:"0", padding:"0", textAlign:"center"}}>{s.name }</p>
                    <div
                      className=" "
                      style={{ display: "flex", justifyContent: "center" }}
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
                      <p className="ms-1">{`(${s.rating})`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
