import React from "react";
import Layout from "../components/layout/Layout";

const divStyle = {
  backgroundImage: 'url("/landingpage.jpg")',
  minHeight: "90vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const HomePage = () => {
  return (
    <Layout title={"Homepage"}>
      <div>
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
                marginTop: "4rem",
                fontSize: "3rem",
              }}
            >
              GrabIt
            </h1>
            <p
              style={{
                textAlign: "center",
                marginTop: "2rem",
                fontSize: "1.2rem",
              }}
            >
              Experience the convenience of local shopping from the comfort of
              your home.
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
      </div>
    </Layout>
  );
};

export default HomePage;
