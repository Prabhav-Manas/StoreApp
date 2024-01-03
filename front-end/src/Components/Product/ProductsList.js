import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };
  // console.log("ProductsList:=> ", products);

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("Item Deleted! ✅");
      getProducts();
    }
  };

  const searchHandler = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="">
      <Container>
        <Row>
          <Col>
            <h1 className="text-success">Products List</h1>
            <div className="searchBox text-center my-4">
              <input
                type="text"
                className="p-2"
                placeholder="Search Here..."
                onChange={searchHandler}
              />
            </div>
            <Table
              striped
              bordered
              responsive
              hover
              size="sm"
              variant="success"
            >
              <thead>
                <tr className="text-center">
                  <th>S.No.</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Company</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((item, i) => (
                    <tr className="text-center" key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.prodName}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <td>{item.company}</td>
                      <td className="text-center">
                        <span className="text-danger">
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => deleteProduct(item._id)}
                          />
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link
                          className="text-primary"
                          to={"/updateProducts/" + item._id}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <p className="text-success">No Product Found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductsList;
