import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

const MyNav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/signIn");
  };

  if (!auth) {
    return null;
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-dark">
        <Container>
          <Navbar.Brand href="">
            <h2 className="text-white">StoreApp</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="">
                <Link to="/" className="link">
                  Products
                </Link>
              </Nav.Link>
              <Nav.Link href="">
                <Link to="/addProducts" className="link">
                  Add Products
                </Link>
              </Nav.Link>
              <Nav.Link href="">
                <Link to="/updateProducts" className="link">
                  Update Products
                </Link>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="">
                <span className="text-white">
                  Welcome{" "}
                  <span className="text-warning">{JSON.parse(auth).name}</span>
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {auth ? (
                  <Link to="/signIn" className="link" onClick={logOut}>
                    Logout
                  </Link>
                ) : (
                  <Link to="/signIn" className="link">
                    SignIn
                  </Link>
                )}
              </Nav.Link>
              <Nav.Link eventKey={2} href="">
                <Link to="/profile" className="link">
                  Profile
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNav;
