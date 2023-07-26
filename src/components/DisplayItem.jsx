import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sony from "./Images/sony.png";

const DisplayItem = ({ info }) => {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleName = (e) => {
    const buttonId = e.currentTarget.id;
    const id = buttonId;
    setId(id);
    navigate(`/productdetails/${id}`);
  };

  return (
    <div style={{ padding: "1%" }}>
      <Grid container spacing={2} padding={1}>
        {info?.mobile?.slice(0, 4).map((m, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <Card>
              <CardMedia
                component="img"
                height={150}
                image={m.image}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {m.name}
                </Typography>
                <Typography variant="info">{m.variant}</Typography>
                <Typography variant="info" component="div">
                  {m.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  id={m.name}
                  variant="contained"
                  color="warning"
                  onClick={handleName}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Card
        id="SONY WF-C500"
        sx={{
          width: "100%",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={handleName}
      >
        <CardMedia
          component="img"
          image={sony}
          alt="sony"
          sx={{
            objectPosition: { xs: "ceter center", md: "" },
            height: { xs: "30vh", md: "100%" },
          }}
        />
      </Card>
      <Grid container spacing={2} padding={1}>
        {info?.laptop?.slice(0, 4).map((m, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <Card>
              <CardMedia
                component="img"
                height={150}
                image={m.image}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {m.name}
                </Typography>
                <Typography variant="info">{m.variant}</Typography>
                <Typography variant="info" component="div">
                  {m.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  id={m.name}
                  variant="contained"
                  color="warning"
                  onClick={handleName}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DisplayItem;
