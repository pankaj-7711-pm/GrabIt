import React from "react";
import Layout from "../../components/layout/Layout";
import { ConState } from "../../context/ConProvider";
import { Button } from "@chakra-ui/react";
import StarRatingComponent from "react-star-rating-component";
import Rating from "react-rating";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const { user, setUser } = ConState();
  const navigate = useNavigate();
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
                      fullSymbol={<FaStar size={24} color="green" />}
                      emptySymbol={<FaRegStar size={24} color="gray" />}
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
                <Button colorScheme="blue">Update Profile</Button>
                <Button
                  colorScheme="blue"
                  className="seller-dash-btn"
                  style={{ marginLeft: "3px" }}
                  onClick={() => navigate("/dashboard/create-product")}
                >
                  Create Product
                </Button>
                <Button
                  colorScheme="blue"
                  className="seller-dash-btn"
                  style={{ marginLeft: "3px" }}
                  onClick={() => navigate("/dashboard/create-category")}
                >
                  Create Category
                </Button>
                <Button
                  colorScheme="blue"
                  className="seller-dash-btn"
                  style={{ marginLeft: "3px" }}
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
                height: "3px",
                backgroundColor: "black",
                border: "none",
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
