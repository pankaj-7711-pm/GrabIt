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

const CategoryWiseSellers = () => {
  const params = useParams();
  const [category, setCategory] = useState();
  const [city, setCity] = useState();
  const [cty, setCty] = useState();
  const [sellers, setSellers] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setCategory(params.categoryname);
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = async () => {
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
    try {
      setCity(cty);
      const { data } = await axios.get("/api/v1/product/get-sellers-location", {
        city,
        page,
      });
      if (data?.success) {
        setSellers(data.sellers);
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
  };

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
            style={{ width: "60%" }}
            variant="outlined"
            onChange={(e) => setCty(e.target.value)}
            placeholder="Search by City"
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
          {sellers?.length === 0 ? (
            <>
              <p
                style={{
                  height: "30vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Sellers in Your Location
              </p>
            </>
          ) : (
            <>
              {city && (
                <p>
                  Showing Sellers of{" "}
                  <span style={{ color: "#A6B1E1" }}>{city}</span>
                </p>
              )}
              <div>
                {sellers.map((s, index) => {
                  return <div>{s.name};</div>;
                })}
              </div>
              <div style={{ display: "flex" }}>
                <Pagination
                  style={{ marginLeft: "auto" }}
                  count={Math.ceil(sellers?.length / 6)}
                  variant="outlined"
                  shape="rounded"
                  className="custom-pagination"
                  page={page}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryWiseSellers;
