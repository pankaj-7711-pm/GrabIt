import React from "react";
import Layout from "../../components/layout/Layout";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Textarea } from "@chakra-ui/react";
import { FormControlLabel, Switch } from "@mui/material";
const CreateProduct = () => {
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
                style={{ height: "40vh", width: "60%" }}
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
                  style={{ width: "48%" }}
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  required
                />
                <TextField
                  style={{ width: "48%" }}
                  id="outlined-basic"
                  label="Category"
                  variant="outlined"
                  required
                />
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
