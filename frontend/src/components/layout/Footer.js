import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer p-5" style={{ backgroundColor: "#424874" }}>
      <h1
        className="text-center"
        style={{
          fontFamily: "Playfair Display",
          fontWeight: "200",
          color: "white",
        }}
      >
        All Right Reserved &copy; PM
      </h1>
      <p
        className="text-center mt-3"
        style={{
          fontFamily: "Playfair Display",
          fontWeight: "200",
          color: "white",
        }}
      >
        <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> | 
         <Link to="/policy">Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
