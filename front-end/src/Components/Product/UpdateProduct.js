import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [prodName, setProdName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const [prodNameErr, setProdNameErr] = useState(false);
  const [priceErr, setPriceErr] = useState(false);
  const [categoryErr, setCategoryErr] = useState(false);
  const [companyErr, setCompanyErr] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleProduct();
  }, []);

  const getSingleProduct = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProdName(result.prodName);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    var prodNamePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)?$/;
    if (prodName === "" || prodNamePattern.test(prodName) === false) {
      setProdNameErr(true);
      return;
    }

    var pricePattern = /^\d+(?:\.\d+)?$/;
    if (price === "" || pricePattern.test(price) === false) {
      setPriceErr(true);
      return;
    }

    if (category === "") {
      setCategoryErr(true);
      return;
    }

    if (company === "") {
      setCompanyErr(true);
      return;
    }

    if (!prodNameErr && !priceErr && !categoryErr && !companyErr) {
      const formData = {
        prodName,
        price,
        category,
        company,
      };
      console.log("UpdateProductData=> ", formData);

      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ prodName, price, category, company }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      console.log("UPDATED=> ", result);
      navigate("/");
    }
    setProdName("");
    setPrice("");
    setCategory("");
    setCompany("");
  };

  const prodNameErrHandler = () => {
    var prodNamePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)?$/;
    if (prodName !== "" || prodNamePattern.test(prodName) === true) {
      setProdNameErr(false);
      return;
    }
  };

  const priceErrHandler = () => {
    var pricePattern = /^\d+(?:\.\d+)?$/;
    if (price !== "" || pricePattern.test(price) === true) {
      setPriceErr(false);
      return;
    }
  };

  const categoryErrHandler = () => {
    if (category !== "") {
      setCategoryErr(false);
      return;
    }
  };

  const companyErrHandler = () => {
    if (company !== "") {
      setCompanyErr(false);
      return;
    }
  };

  return (
    <div className="">
      <Container>
        <Row>
          <Col md={6} className="m-auto p-5 shadow my-5 formPosition">
            <Form className="">
              <h1 className="my-4">Update Product</h1>
              <div className="d-md-flex justify-content-between">
                <Col md={6}>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Product Name"
                      className="relative"
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      onKeyUp={prodNameErrHandler}
                    />
                    <p>
                      {prodNameErr ? (
                        <span className="text-danger absolute">
                          Invalid Name
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                  </Form.Group>
                </Col>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Col>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      onKeyUp={priceErrHandler}
                    />
                    <p>
                      {priceErr ? (
                        <span className="text-danger absolute">
                          Invalid Price
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                  </Form.Group>
                </Col>
              </div>

              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Category"
                  className="relative"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onKeyUp={categoryErrHandler}
                />
                <p>
                  {categoryErr ? (
                    <span className="text-danger absolute">
                      Invalid Category
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </Form.Group>

              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company"
                  className="relative"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  onKeyUp={companyErrHandler}
                />
                <p>
                  {companyErr ? (
                    <span className="text-danger absolute">
                      Invalid Company Name
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </Form.Group>
            </Form>
            <Button
              className="submitBtn addProdBtnPosition"
              onClick={updateProduct}
            >
              Update
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateProduct;
