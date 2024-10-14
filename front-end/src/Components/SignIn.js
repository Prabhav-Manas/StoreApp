import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  // Validation
  const submitForm = async () => {
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
        email,
        password,
      };
      console.log("SignInFormData", formData);

      let result = await fetch("http://localhost:5000/signin", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      console.log(result);

      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      } else {
        alert("Invalid Credentials!");
      }

      setEmail("");
      setPassword("");
    }
  };

  // RESET
  const emailHandler = () => {
    var emailPattern = /[a-zA-Z0-9]+[@][a-z]+[\\.][a-z]{2,3}$/;
    if (email !== "" && emailPattern.test(email) === true) {
      setEmailErr(false);
      return;
    }
  };

  const passwordHandler = () => {
    if (password !== "" && password.length >= 6) {
      setPasswordErr(false);
      return;
    }
  };

  return (
    <Container>
      <Row>
        <Col md={4} className="m-auto my-5 shadow p-5">
          <h2 className="text-center">SignIn</h2>
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-4"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                className="relative"
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
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-4"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                className="relative"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={passwordHandler}
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
          <div className="d-md-flex justify-content-between my-3">
            <p>
              Don't have account ?{" "}
              <Link className="text-primary link" to="/signUp">
                SignUp
              </Link>
            </p>

            <button type="" className="bg-dark text-white" onClick={submitForm}>
              Sign in
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
