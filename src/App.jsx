import { useEffect, useState } from "react";
import Header from "./components/Header";
import DisplayItem from "./components/DisplayItem";
import axios from "axios";
import ProductDetail from "./components/ProductDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import { ProductProvider } from "./components/ProductContext";

const App = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://jsonware.com/api/v1/json/f569818a-c251-458b-b484-1a6e36f79d8d?dynamic=true"
      )
      .then((res) => {
        const infoData = res.data;
        console.log(infoData);
        setInfo(infoData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ProductProvider>
      <Router>
        <Header />
        <Routes>
          {info && (
            <>
              <Route exact path="/" element={<DisplayItem info={info} />} />
            </>
          )}
          <Route
            exact
            path="/productdetails/:id"
            element={<ProductDetail info={info} />}
          />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/cart" element={<Cart info={info} />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
};

export default App;
