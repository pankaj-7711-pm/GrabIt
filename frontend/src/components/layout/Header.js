import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ConState } from "../../context/ConProvider";
import { useToast } from "@chakra-ui/react";

const Header = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { user,setUser } = ConState();
const handleLogout = () => {
  setUser({
    ...user,
    user: null,
    token: "",
  });
  localStorage.removeItem("userInform");
  toast({
    title: "Logout Successful",
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top",
  });
};
  return (
    <>
      <nav
        className="navbar navbar-expand-lg p-3"
        style={{ backgroundColor: "#DCD6F7" }}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            {" "}
            GrabIt
          </Link>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse navbar-main-div"
            id="navbarTogglerDemo01"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </li>

              {!user?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li
                    className="nav-item dropdown"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <Link
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.user.name}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            user?.user?.isSeller === false ? "user" : "seller"
                          }`}
                          className="dropdown-item p-3"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item p-3"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
