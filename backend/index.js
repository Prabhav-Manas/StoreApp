const express = require("express");
const cors = require("cors");

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

const app = express();

app.use(express.json());
app.use(cors());

// ---- SignUp ----
app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({
        result: "Something went wrong! Please try after sometime.",
      });
    }
    res.send({ result, auth: token });
  });
});

// ---- SignIn ----
app.post("/signin", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({
            result: "Something went wrong! Please try after sometime.",
          });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No User Found!" });
    }
  } else {
    res.send({ result: "Invalid credential!" });
  }
});

// ---- addProduct ----
app.post("/addProduct", verifyToken, async (req, res) => {
  // let product = new Product(req.body);
  // let result = await product.save();
  // res.send(result);

  const { prodName, price, category, company } = req.body;
  const userId = req.user._id;

  try {
    const product = new Product({
      prodName,
      price,
      category,
      userId, // Associate the product with the user
      company,
    });

    const result = await product.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ result: "Error adding product" });
  }
});

// ---- GET Product ----
app.get("/products", verifyToken, async (req, res) => {
  const userId = req.user._id;
  let products = await Product.find({ userId });
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No product found" });
  }
});

// ---- DELETE Product ----
app.delete("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

// ---- GET SINGLE Product ----
app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No product found" });
  }
});

// ---- UPDATE Product ----
app.put("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

// ---- SEARCH API ----
app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      {
        prodName: { $regex: req.params.key },
      },
      {
        price: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
      {
        company: { $regex: req.params.key },
      },
    ],
  });
  res.send(result);
});

// ---- MiddleWare To Verify TOKEN ----
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please provide valid token" });
      } else {
        req.user = valid.user;
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Please add token with header" });
  }
}

app.listen(5000);
