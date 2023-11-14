import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Image, NavLink, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../store';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../assets/images/logo.svg';
import { AuthContext } from '../App';

function Header() {
  var navigate = useNavigate();
  // const {user}=useContext(AuthContext);
  const { user, dispatch } = useContext(userContext);
  console.log(user)
  const Logout = () => {
    localStorage.clear();
    dispatch({ type: "reset", valuse: "" });
    // localStorage.clear(); 
    // setIsLoggedIn(true);
    navigate('/')
    window.location.reload();
    toast.success("Logout Successfully")
  };



  // const [isLoggedIn, setIsLoggedIn] = useState();
  return (
    <>
      <header>
        <div className="nav-area container">
          <div className="cover-nav">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" className="img-fluid" />
              </Link>
            </div>

            {!user.tokendata && <>
              <Link to="" id="pull">
                <div className="hamburger hamburger--spring">
                  <div className="hamburger-box">
                    <div className="hamburger-inner" />
                  </div>
                </div>
              </Link>
            </>}

            <div className="nav">

              {!user.tokendata && (
                <ul id="menu-bg">
                  <li>
                    <Button className="log-in-register" >
                      {" "}
                      Login
                    </Button>
                    <ul className="submenu">
                      <li>
                        <Link to="/login" state={{ provider_status: true }}>Login As A Provider</Link>
                      </li>
                      <li>
                        <Link to="/login" state={{ provider_status: false }}>Login As A Non Provider</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Button className="log-in-register" >
                      {" "}
                      Register
                    </Button>
                    <ul className="submenu">
                      <li>
                        <Link to="/signup" state={{ provider_status: true }}>Register As A Provider</Link>
                      </li>
                      <li>
                        <Link to="/signup" state={{ provider_status: false }}>Register As A Non Provider</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              )}


            </div>

            {user.tokendata && (
              <div className="dropdown datapass">
                <Link
                  className="btn btn-primary dropdown-toggle"
                  to={""}
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* Button trigger modal */}
                  {user.tokendata ? user?.name : "Name"}

                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >

                  <li>
                    {user.tokendata ? <Link className="dropdown-item" to={"/profile"}>
                      My Profile
                    </Link> : ''}

                  </li>
                 
                  <li>
                    {user.tokendata && (user.user_type == "1" || user.user_type == "2" || user.user_type == "3") && <Link className="dropdown-item" to={"/notification"}>
                      Connection Request
                    </Link >
                    }
                    {user.tokendata && (user.user_type == "4" || user.user_type == "5" || user.user_type == "6") && <Link className="dropdown-item" to={"/myconnection"}>
                      MyConnections
                    </Link >}
                  </li>
                  <li>
                    {user.tokendata && (user.user_type == "1" || user.user_type == "2" || user.user_type == "3") && <Link className="dropdown-item" to={"/requestlist"}>
                      Request History
                    </Link >
                    }

                  </li>
                  <li>
                    {user.tokendata && (user.user_type == "1" || user.user_type == "2" || user.user_type == "3") && <Link className="dropdown-item" to={"/connectionlist"}>
                      Connection List
                    </Link >
                    }

                  </li>
                  <li>
                    {user.tokendata && <button className="dropdown-item" onClick={Logout}>
                      Logout
                    </button >}
                  </li>
                </ul>
              </div>
              // <ul id="menu-bg">
              //   <li>
              //     <Button className="log-in-register" onClick={Logout} to="/">
              //       Logout
              //     </Button>
              //   </li>
              // </ul>
            )}

          </div>
        </div>
      </header>

    </>
  )
}

export default Header