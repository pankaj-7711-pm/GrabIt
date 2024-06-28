import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div
      className="footer px-5 pt-5 pb-3"
      style={{ backgroundColor: "#424874" }}
    >
      <div className="row">
        <div className="col-lg-4 col-md-4 d-flex mt-3 justify-content-center align-items-center">
          <div>
            <h1 style={{ color: "#DCD6F7", fontSize: "5rem", margin: "0" }}>
              GrabIt
            </h1>
            <p
              className="footer-para-main"
              style={{ color: "#F4EEFF", fontSize: "1rem", margin: "0" }}
            >
              Just Grab it.
            </p>
          </div>
        </div>
        <div
          className="col-lg-4 mt-3 col-md-4 d-flex justify-content-center align-items-center"
          style={{ flexDirection: "column" }}
        >
          <div
            onClick={() => navigate("/about")}
            style={{
              color: "white",
              fontWeight: "100",
              margin: "5px",
              cursor: "pointer",
            }}
          >
            About
          </div>
          <div
            onClick={() => navigate("/contact")}
            style={{
              color: "white",
              fontWeight: "100",
              margin: "5px",
              cursor: "pointer",
            }}
          >
            Contact
          </div>
          <div
            onClick={() => navigate("/policy")}
            style={{
              color: "white",
              fontWeight: "100",
              margin: "5px",
              cursor: "pointer",
            }}
          >
            Privacy Policy
          </div>
        </div>
        {/* <hr className="hr-footer" style={{height:"2px", width:"80%", display:"none", backgroundColor:"white"}}/> */}
        <div
          className="col-lg-4 col-md-4 mt-3 "
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div>
            <h5
              // className="footer-social-media"
              style={{ color: "white", fontWeight: "400", margin: "5px" }}
            >
              Follow us on
            </h5>
            <div
              style={{
                color: "white",
                fontWeight: "100",
                margin: "5px",
                fontWeight: "100",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <div>
                <InstagramIcon style={{}} />
              </div>{" "}
              &nbsp;
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "100",
                  marginTop: "1px",
                }}
              >
                Instagram
              </div>
            </div>
            <div
              style={{
                color: "white",
                fontWeight: "100",
                margin: "5px",
                fontWeight: "100",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <div>
                <FacebookIcon style={{}} />
              </div>{" "}
              &nbsp;
              <div style={{ fontSize: "18px", marginTop: "1px" }}>Facebook</div>
            </div>
            <div
              style={{
                color: "white",
                fontWeight: "100",
                margin: "5px",
                fontWeight: "100",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <div>
                <XIcon style={{}} />
              </div>{" "}
              &nbsp;
              <div style={{ fontSize: "18px", marginTop: "1px" }}>Twitter</div>
            </div>
          </div>
        </div>
      </div>
      <p
        className="text-center all-right-div"
        style={{
          // fontFamily: "Playfair Display",
          fontWeight: "100",
          color: "white",
          marginTop: "3rem",
          fontSize: "1rem",
        }}
      >
        All Right Reserved &copy; PM
      </p>
    </div>
  );
};

export default Footer;
