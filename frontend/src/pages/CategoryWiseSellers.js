import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import {
  Button,
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Rating from "react-rating";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const CategoryWiseSellers = () => {
  const params = useParams();
  const [category, setCategory] = useState(params.categoryname);
  const [city, setCity] = useState("");
  const [cty, setCty] = useState();
  const [sellers, setSellers] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [len, setLen] = useState();

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = () => {
    if (!cty) {
      toast({
        title: "City name required",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setCity(cty);
  };

  const getSellers = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/product/get-sellers-category",
        { city, page, category }
      );
      if (data?.success) {
        setSellers(data?.sellers);
        setLen(data.len);
        console.log(data.sellers);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getSellers();
    // console.log(`city:${city}`)
    // console.log(`page:${page}`);
    // console.log(`category:${category}`);
  }, [city, page]);

  return (
    <Layout>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <TextField
            className="search-div-category-wise-seller"
            style={{ width: "60%" }}
            variant="outlined"
            onChange={(e) => setCty(e.target.value)}
            placeholder="Search Sellers by City"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    style={{ fontSize: "1rem", color: "#424874" }}
                    onClick={handleSearch}
                  >
                    SEARCH
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // fullWidth
          />
        </div>
        <div>
          <h2 style={{ textAlign: "center", fontSize: "3rem" }}>{category}</h2>
          {/* <p>Showing All Sellers</p> */}
          {city && (<p style={{textAlign:"center"}}>Showing sellers of <span>{city}</span></p>)}
          {len == 0 && (
            <div
              style={{
                height: "30vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "1.5rem",
                  background:
                    "linear-gradient(90deg, #1e3c72, #2a5298, #6db3f2, #d1e0e0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "slide 5s linear infinite",
                  backgroundSize: "200% 200%",
                }}
              >
                No Seller found.
              </p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {sellers?.map((s, index) => {
              return (
                <div
                  className="card text-bg-dark sellers-main-category-wise"
                  style={{
                    width: "20rem",
                    margin: "2rem",
                    height: "18rem",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/seller/${s._id}`)}
                >
                  <img
                    src={s.pic}
                    className="card-img"
                    alt="..."
                    style={{ height: "18rem" }}
                  />
                  <div
                    className="card-img-overlay sellers-card"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "2rem",
                        textAlign: "center",
                        background:
                          "linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {s.name}
                    </h5>
                    <div className="d-flex ">
                      <Rating
                        initialRating={s.rating}
                        readonly
                        fullSymbol={<FaStar size={24} color="yellow" />}
                        emptySymbol={<FaRegStar size={24} color="#fff" />}
                        placeholderSymbol={
                          <FaStarHalfAlt size={24} color="yellow" />
                        }
                      />
                      <p
                        className="ms-1"
                        style={{ fontSize: "1.2rem" }}
                      >{`(${parseFloat(s?.rating).toFixed(1)})`}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {len !== 0 && (
            <div
              style={{
                display: "flex",
                margin: "1rem",
                justifyContent: "center",
              }}
            >
              <Pagination
                // style={{ marginLeft: "auto" }}
                count={Math.ceil(len / 6)}
                variant="outlined"
                shape="rounded"
                className="custom-pagination"
                page={page}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryWiseSellers;
