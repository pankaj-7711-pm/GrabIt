import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import Rating from "react-rating";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const SeperateProduct = () => {
  const [product, setProduct] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  const params = useParams();

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
                <Button style={{}}>Add to Wishlist</Button>
              </div>
              <div className="d-flex ">
                <Rating
                  initialRating={product.rating}
                  readonly
                  fullSymbol={<FaStar size={24} color="#424874" />}
                  emptySymbol={<FaRegStar size={24} color="#A6B1E1" />}
                  placeholderSymbol={<FaStarHalfAlt size={24} color="yellow" />}
                />
                <p
                  className="ms-1"
                  style={{ marginBottom: "8px" }}
                >{`(${parseFloat(product?.rating).toFixed(1)})`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SeperateProduct;
