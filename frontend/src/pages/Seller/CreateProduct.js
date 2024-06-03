import React,{useState,useEffect} from "react";
import Layout from "../../components/layout/Layout";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Textarea } from "@chakra-ui/react";
import { FormControlLabel, MenuItem, Switch } from "@mui/material";
import axios from "axios";
import { ConState } from "../../context/ConProvider";
import { Select } from "@chakra-ui/react";
const CreateProduct = () => {
  const { user } = ConState();
  const [categories, setCategories] = useState([]);
  
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-category/${user?.user?._id}`
      );
      setCategories(data?.category);
      console.log(categories);
      
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);


  return (
    <Layout>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="main-div-create-product"
          style={{
            minHeight: "80vh",
            // backgroundColor: "white",
            padding: "3rem",
            width: "80%",
          }}
        >
          <h1 className="text-center">Create Product</h1>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                className="create-product-input"
                style={{ width: "60%" }}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                required
              />
              <Textarea
                className="create-product-input"
                style={{
                  height: "40vh",
                  width: "60%",
                }}
                // onChange={(e) => setDiscription(e.target.value)}
                // value={discription}
                placeholder="Write detailed description about your Product in more than 200 characters"
              />
              <div
                className="create-product-input"
                style={{
                  width: "60%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  style={{ width: "49%" }}
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  required
                />
                {/* <div style={{ width: "49%" }}>
                  <Select
                    style={{ height: "3.6rem" }}
                    placeholder="Select Category"
                  >
                    {categories?.map((item) => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </Select>
                </div> */}
                <TextField
                  style={{ width: "49%" }}
                  id="outlined-select-currency-native"
                  select
                  // label="Category"
                  // defaultValue="None"
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Select Category"
                >
                  {categories.map((option) => (
                    <option  value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </div>

              <label
                className="btn btn-outline-secondary create-product-input"
                style={{ width: "60%" }}
              >
                {"Upload Images"}

                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  //   onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
              <div
                className="create-product-input"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "60%",
                  justifyContent: "space-between",
                }}
              >
                <FormControlLabel
                  //   required
                  control={<Switch defaultChecked />}
                  label="Available"
                />
                <FormControlLabel
                  className="inoffer-input"
                  //   required
                  control={<Switch />}
                  label="Offer"
                  style={{ marginLeft: "auto" }}
                />
                <TextField
                  className="inoffer-div"
                  style={{ width: "48%" }}
                  id="outlined-basic"
                  label="Offer Price"
                  variant="outlined"
                />
              </div>
              <Button
                className="create-product-input"
                variant="contained"
                style={{ width: "60%" }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
