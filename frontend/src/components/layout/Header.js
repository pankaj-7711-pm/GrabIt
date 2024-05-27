import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ConState } from "../../context/ConProvider";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Header = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user, setUser } = ConState();
  const handleLogout = () => {
    setUser({
      ...user,
      user: null,
      token: "",
    });
    localStorage.removeItem("userInform");
    navigate("/login");
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
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <Avatar size="sm" src={user?.user?.pic} />
                        &nbsp;{user?.user?.name}
                      </div>
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() =>
                          navigate(
                            `/dashboard/${
                              user?.user?.isSeller === false ? "user" : "seller"
                            }`
                          )
                        }
                      >
                        Dashboard
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
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
