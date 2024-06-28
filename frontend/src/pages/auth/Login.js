import React from "react";
import Layout from "../../components/layout/Layout";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import CustomerLogin from "./CustomerLogin";
import SellerLogin from "./SellerLogin";

const Login = () => {
  return (
    // <Layout title={"Login to continue"}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <h1 className="text-center pt-3 pb-2 login-text">Login</h1>
      <div className="login-main" style={{}}>
        <Tabs
          className="aa"
          variant="soft-rounded"
          style={{
            border: "1px solid gray",
            padding: "1rem",
            borderRadius: "10px",
            backgroundColor: "white",
            width: "100%",
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
              style={{ padding: "10px 20px", minWidth: "30%" }}
            >
              Customer
            </Tab>
            <Tab
              className="aa"
              style={{ padding: "10px 20px", minWidth: "30%" }}
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
              <CustomerLogin />
            </TabPanel>
            <TabPanel
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SellerLogin />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
    // </Layout>
  );
};

export default Login;
