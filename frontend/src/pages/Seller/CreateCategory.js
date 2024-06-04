import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { ConState } from "../../context/ConProvider";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateCategory = () => {
  const [name, setName] = useState();
  const [categories, setCategories] = useState([]);
  const [cid, setCid] = useState();
  const toast = useToast();
  const { user } = ConState();
  const [open, setOpen] = useState(false);
  const handleOpen = (id, n) => {
    setCid(id);
    setName(n);
    console.log(id);

    setOpen(true);
  };
    const handleClose = () => {
        setName("");
        setOpen(false)
    };

  const handleUpdate = async () => {
    if (!name) {
      toast({
        title: "Category name required",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${cid}`,
        {
          name,
        }
      );
      if (data?.success) {
        toast({
          title: "Category Updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        getCategories();
        handleClose();
      }
    } catch (error) {
      toast({
        title: "Error in creating category",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/get-category/${user?.user?._id}`
      );
      setCategories(data?.category);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleCreate = async () => {
    if (!name) {
      toast({
        title: "Category name required",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    //   console.log(name);
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast({
          title: "Category created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        getCategories();
      }
    } catch (error) {
      toast({
        title: "Error in creating category",
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
              onChange={(e) => setName(e.target.value)}
              //   value={name}
              className="category-inp"
              style={{ width: "50%", marginTop: "5rem" }}
              id="outlined-basic"
              label="Category name"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <Button variant="text" onClick={handleCreate}>
                        Create
                      </Button>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormHelperText id="component-helper-text">
              Enter Category name
            </FormHelperText>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "70%",
                marginTop: "2rem",
              }}
            >
              <hr
                style={{
                  width: "50%",
                  height: "2px",
                  backgroundColor: "black",
                  border: "none",
                }}
              />
            </div>
            <div style={{ width: "70%", marginBottom: "5rem" }}>
              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                All Categories
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {categories.map((item) => {
                  return (
                    <>
                      <div
                        className="create-category-hvr"
                        onClick={() => handleOpen(item._id, item.name)}
                        style={{
                          padding: "1rem 2rem",
                          minWidth: "5rem",
                          margin: "1rem",
                          border: "1px solid rgb(195, 194, 194)",
                          borderRadius: "5px",
                          cursor: "pointer",
                          //   backgroundColor:"white"
                        }}
                      >
                        {item.name}
                      </div>
                    </>
                  );
                })}
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <TextField
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Category name"
                    variant="outlined"
                    value={name}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <Button
                              variant="text"
                              onClick={() => handleUpdate()}
                            >
                              Update
                            </Button>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      marginTop: "10px",
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
