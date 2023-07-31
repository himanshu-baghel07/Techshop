import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "./Firebase";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useProductContext } from "./ProductContext";

const Cart = ({ info }) => {
  const [user, setUser] = useState(null);
  const [pName, setpName] = useState("");
  const [pAddress, setPAddress] = useState("");
  const [pPhone, setPPhone] = useState("");
  const [pEmail, setPEmail] = useState("");
  const { productArray } = useProductContext();

  const { setProductArray } = useProductContext();

  const handleRemoveProduct = (productName) => {
    const updatedProductArray = productArray.filter(
      (product) => product !== productName
    );
    setProductArray(updatedProductArray);
  };

  const cartProducts = Object.values(info).flatMap((productsInCategory) =>
    productsInCategory.filter((product) => productArray.includes(product.name))
  );

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            const data = doc.data();
            setpName(data.name);
            setPEmail(data.email);
            setPPhone(data.phone);
            setPAddress(data.address);
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const totalAmount = cartProducts.reduce(
    (acc, product) => acc + parseFloat(product.price.replace(/₹|,/g, "")),
    0
  );
  console.log("Total", totalAmount);

  if (cartProducts.length === 0) {
    return <div>Product not found</div>;
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        backgroundColor: "#f0f8fa",
        gap: "20px",
        width: "50%",
        margin: "1% 25%",
        padding: "2%",
      }}
    >
      <Box>
        <Typography variant="h5" gutterBottom>
          Order Summary
        </Typography>

        <Typography>Name: {pName}</Typography>
        <Typography>Email: {pEmail}</Typography>
        <Typography>Phone: {pPhone}</Typography>
        <Typography>Address: {pAddress}</Typography>
      </Box>
      {/* <Card
        sx={{
          display: "flex",

          justifyContent: "space-evenly",
          borderRadius: "10%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {foundProduct.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              gutterBottom
            >
              {foundProduct.variant}
            </Typography>
            <Typography variant="h6" component="div">
              {foundProduct.price}
            </Typography>
          </CardContent>
        </Box>

        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={foundProduct.image}
          alt="Live from space album cover"
        />
      </Card> */}
      {cartProducts.map((product) => (
        <Card
          key={product.name} // Make sure to set a unique key for each card
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            height: "200",
            width: "80%",
            margin: "10px",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {product.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                gutterBottom
              >
                {product.variant}
              </Typography>
              <Typography variant="h6" component="div">
                {product.price}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveProduct(product.name)}
              >
                Remove Product
              </Button>
            </CardContent>
          </Box>

          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={product.image}
            alt="Live from space album cover"
          />
        </Card>
      ))}
      <Typography variant="h5">
        Grand Total: ₹{totalAmount.toFixed(2)}
      </Typography>
      <Button variant="contained" color="warning" size="large">
        Place An Order
      </Button>
    </div>
  );
};

export default Cart;
