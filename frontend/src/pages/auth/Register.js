import React from "react";
import Layout from "../../components/layout/Layout";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import CustomerLogin from "./CustomerLogin";
import SellerLogin from "./SellerLogin";
import CustomerRegister from "./CustomerRegister";
import SellerRegister from "./SellerRegister";

const Register = () => {
  return (
    <Layout title={"Register to create account"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <h1 className="text-center pt-3 pb-2 login-text">Register</h1>
        <div className="login-main mb-4" style={{}}>
          <Tabs
            className="aa"
            variant="soft-rounded"
            style={{
              border: "1px solid gray",
              padding: "1rem",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            <TabList
              mb={"1em"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Tab
                className="aa me-1"
                style={{ padding: "10px 20px", width: "8rem" }}
              >
                Customer
              </Tab>
              <Tab
                className="aa"
                style={{ padding: "10px 20px", width: "8rem" }}
              >
                Seller
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomerRegister />
              </TabPanel>
              <TabPanel
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SellerRegister />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
