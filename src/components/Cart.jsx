import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "./Firebase";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Cart = ({ info }) => {
  const { name } = useParams();
  const [user, setUser] = useState(null);
  const [pName, setpName] = useState("");
  const [pAddress, setPAddress] = useState("");
  const [pPhone, setPPhone] = useState("");
  const [pEmail, setPEmail] = useState("");
  let foundProduct = null;

  for (const category in info) {
    const productsInCategory = info[category];
    foundProduct = productsInCategory.find((product) => product.name === name);
    if (foundProduct) {
      break;
    }
  }

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

  if (!foundProduct) {
    return <div>Product not found</div>;
  }
  return (
    <div>
      <h2>Your Order Summary</h2>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",

          height: "100%",
          width: "50%",
        }}
      >
        <CardMedia
          image={foundProduct.image}
          height={200}
          component="img"
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1">{foundProduct.variant}</Typography>
          <Typography variant="body1">{foundProduct.price}</Typography>
        </CardContent>
      </Card>

      <h4>{pName}</h4>
      <h4>{pEmail}</h4>
      <h4>{pPhone}</h4>
      <h4>{pAddress}</h4>
      <h4>{}</h4>
    </div>
  );
};

export default Cart;
