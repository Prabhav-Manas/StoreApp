import "./App.css";
import MyNav from "./Components/Nav";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp";
import PrivateComponent from "./Components/PrivateComponent";
import SignIn from "./Components/SignIn";
import AddProduct from "./Components/Product/AddProduct";
import ProductsList from "./Components/Product/ProductsList";
import UpdateProduct from "./Components/Product/UpdateProduct";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductsList />} />
            <Route path="/addProducts" element={<AddProduct />} />
            <Route path="/updateProducts/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logged Out</h1>} />
            <Route path="/profile" element={<h1>My Profile</h1>} />
          </Route>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
