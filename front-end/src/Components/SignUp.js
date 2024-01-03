import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const navigate = useNavigate();

  // === Toggle Password Eye Icon ===
  const [showPassword, setShowPassword] = useState(false);
  const handlTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // === AuthGuard ===
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  // === Validation ===
  const submitForm = async () => {
    if (name === "" || name.length < 3) {
      setNameErr(true);
      return;
    }

    var emailPattern = /[a-zA-Z0-9]+[@][a-z]+[\\.][a-z]{2,3}$/;
    if (email === "" || emailPattern.test(email) === false) {
      setEmailErr(true);
      return;
    }

    if (password === "" || password.length < 6) {
      setPasswordErr(true);
      return;
    }

    if (!emailErr && !passwordErr) {
      const formData = {
        name,
        email,
        password,
      };
      console.log("FormData=> ", formData);

      let result = await fetch("http://localhost:5000/signup", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      if (result) {
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      }

      setName("");
      setEmail("");
      setPassword("");
    }
  };

  // RESET Error
  const nameHandler = () => {
    setNameErr(false);
    return;
  };

  const emailHandler = () => {
    setEmailErr(false);
    return;
  };

  const passwordHandler = () => {
    setPasswordErr(false);
    return;
  };

  return (
    <Container>
      <Row>
        <Col md={4} sm={6} className="m-auto my-5 shadow p-4">
          <h2 className="signUpHeader text-center mb-3">Sign Up</h2>
          <Form>
            {/* -------Full Name------- */}
            <FloatingLabel
              controlId="floatingInputName"
              label="Full Name"
              className="mb-4"
            >
              <Form.Control
                type="text"
                placeholder="fullName"
                className="relative"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyUp={nameHandler}
              />
              <p>
                {nameErr ? (
                  <span className="text-danger absolute">Invalid Name</span>
                ) : (
                  ""
                )}
              </p>
            </FloatingLabel>

            {/* -------Email------- */}
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-4"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                className="realtive"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={emailHandler}
              />
              <p>
                {emailErr ? (
                  <span className="text-danger absolute">Invalid Email</span>
                ) : (
                  ""
                )}
              </p>
            </FloatingLabel>

            {/* -------Password------- */}
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-4"
            >
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="eyeInput relative"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={passwordHandler}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="eyeIcon"
                onClick={handlTogglePassword}
              />
              <p>
                {passwordErr ? (
                  <span className="text-danger absolute">Invalid Password</span>
                ) : (
                  ""
                )}
              </p>
            </FloatingLabel>
          </Form>
          <div className="d-lg-flex justify-content-between mt-2">
            <p className="mt-1">
              Already have account ?{" "}
              <Link className="text-primary link" to="/signIn">
                Sign in
              </Link>
            </p>
            <Button
              type="submit"
              className="submitBtn bg-dark"
              onClick={submitForm}
            >
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
