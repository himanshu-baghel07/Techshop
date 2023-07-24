import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = ({ info }) => {
  const { id } = useParams();

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

            <Button
              sx={{
                backgroundColor: "green",
                color: "white",
                textAlign: "center",
                fontFamily: "Rubik",
                "&:hover": { backgroundColor: "#527506" },
              }}
            >
              Buy
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ProductDetail;
