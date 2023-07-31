import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "./ProductContext";

const ProductDetail = ({ info }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const { productArray, setProductArray } = useProductContext();

  const addProduct = () => {
    if (foundProduct && foundProduct.name) {
      // Check if the product name already exists in the productArray
      const isProductAlreadyAdded = productArray.some(
        (product) => product === foundProduct.name
      );

      if (isProductAlreadyAdded) {
        // Handle the case when the same product is already added
        console.log("Product already added!");
        // You can show an alert or take any other action here
      } else {
        // Add the product to the productArray if it's not already added
        setProductArray([...productArray, foundProduct.name]);
        setProductName(foundProduct.name);
      }
    }
  };

  const removeProduct = (index) => {
    const updatedProductArray = [...productArray];
    updatedProductArray.splice(index, 1);
    setProductArray(updatedProductArray);
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const navigate = useNavigate();

  let foundProduct = null;

  for (const category in info) {
    const productsInCategory = info[category];
    foundProduct = productsInCategory.find((product) => product.name === id);
    if (foundProduct) {
      break;
    }
  }

  if (!foundProduct) {
    return <div>Product not found</div>;
  }

  const handlClickName = (e) => {
    const buttonId = e.currentTarget.id;
    const name = buttonId;
    setName(name);
    navigate(`/cart/${name}`);
  };

  const productAlreadyAdded = productArray.includes(foundProduct.name);
  return (
    <Container
      maxWidth={false}
      id="description"
      sx={{
        height: "92vh",
        overflowY: "auto",
        paddingBottom: "20px",
        paddingTop: "20px",
      }}
    >
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Rubik&family=Ubuntu:wght@500&display=swap');
      </style>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <Card sx={{ height: "100%", border: "none", boxShadow: "none" }}>
          <CardMedia
            component="img"
            image={foundProduct.image}
            alt="movie image"
            sx={{
              objectFit: "fill",
              height: "100%",
            }}
          />
        </Card>

        <Card
          id="card"
          sx={{
            width: { md: "40%", xs: "100%" },
            height: "100%",
            marginTop: "20p",
            color: "black",
            marginBottom: "50px",
            border: "none",
            boxShadow: "none",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              component="div"
              sx={{
                fontSize: "2.3rem",
                marginBottom: "10px",
                fontFamily: "Ubuntu",
              }}
            >
              {foundProduct.name}
            </Typography>

            <Typography
              gutterBottom
              component="div"
              sx={{
                fontSize: "1rem",
                marginBottom: "30px",
                fontFamily: "Rubik",
              }}
            >
              {foundProduct.variant}
            </Typography>

            <Typography
              gutterBottom
              component="div"
              sx={{
                fontSize: "1rem",
                marginBottom: "10px",
                fontFamily: "Rubik",
              }}
            >
              <b>Battery:</b> {foundProduct.battery}
            </Typography>

            {foundProduct.processor ? (
              <Typography
                gutterBottom
                component="div"
                sx={{
                  fontSize: "1rem",
                  marginBottom: "10px",
                  fontFamily: "Rubik",
                }}
              >
                <b>Processor:</b> {foundProduct.processor}
              </Typography>
            ) : (
              ""
            )}

            {foundProduct.size ? (
              <Typography
                gutterBottom
                component="div"
                sx={{
                  fontSize: "1rem",
                  marginBottom: "10px",
                  fontFamily: "Rubik",
                }}
              >
                <b>Size:</b> {foundProduct.size}
              </Typography>
            ) : (
              ""
            )}

            <Typography
              gutterBottom
              component="div"
              sx={{
                fontSize: "1rem",
                marginBottom: "10px",
                fontFamily: "Rubik",
              }}
            >
              <b>Price:</b> {foundProduct.price}
            </Typography>
            {productAlreadyAdded ? (
              <>
                <Typography variant="subtitle2" color="goldenrod" gutterBottom>
                  Product already added
                </Typography>
                <Button
                  sx={{
                    backgroundColor: "green",
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Rubik",
                    "&:hover": { backgroundColor: "#527506" },
                  }}
                  onClick={handleGoToCart}
                >
                  Go to Cart
                </Button>
              </>
            ) : (
              <Button
                id={foundProduct.name}
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  textAlign: "center",
                  fontFamily: "Rubik",
                  "&:hover": { backgroundColor: "#527506" },
                }}
                onClick={addProduct}
              >
                add to Cart
              </Button>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ProductDetail;
