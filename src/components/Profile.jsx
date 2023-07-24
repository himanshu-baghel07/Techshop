import React, { useEffect, useState } from "react";
import firebase from "./Firebase";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  Input,
  Box,
  TextareaAutosize,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { EditNote } from "@mui/icons-material";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

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
            setEmail(data.email);
            setName(data.name);
            setPhone(data.phone);
            setAddress(data.address);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const updateProfile = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({
        name,
        email,
        phone,
        address,
      })
      .then(() => {
        setIsEdit(false);
      })
      .catch((error) => {
        console.log("Error updating Profile", error);
      });
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        textAlign: "center",
        padding: "1%",
        border: "2px double navy",
      }}
    >
      {name ? (
        isEdit ? (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Edit your details
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              gap={2}
            >
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={updateProfile}
                sx={{ mt: 2 }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                onClick={() => setIsEdit(false)}
                sx={{ mt: 2 }}
              >
                Cancel Edit
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Your Details
            </Typography>
            <Typography variant="h6" gutterBottom>
              Name: {name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Address: {address}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Phone: {phone}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setIsEdit(true)}
              startIcon={<EditNote />}
              sx={{ mt: 2, mr: 2 }}
            >
              Edit Details
            </Button>
            <Button
              variant="contained"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ mt: 2 }}
            >
              Logout
            </Button>
          </>
        )
      ) : (
        <Typography variant="body1" align="center">
          wait a minute if details not loads then Login again
        </Typography>
      )}
    </Container>
  );
};

export default Profile;
