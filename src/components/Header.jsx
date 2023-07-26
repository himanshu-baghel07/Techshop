import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useEffect, useState } from "react";
import DrawerComponent from "./DrawerComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import firebase from "./Firebase";
import {
  LogoutOutlined,
  Person,
  Person2,
  PersonOutline,
  ShoppingCart,
} from "@mui/icons-material";

const PAGES = [
  { label: "Home", path: "/" },
  { label: "SignUp", path: "/signup" },
  { label: "SignIn", path: "/signin" },
];

const Header = () => {
  const [value, setValue] = useState("/");
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Update the value when the location changes
    setValue(location.pathname);

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
            setName(data.name);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [location]);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCartClick = (e) => {
    if (user) {
      navigate("/cart");
    } else {
      navigate("/signin");
    }
  };

  return (
    <AppBar position="static" sx={{ background: "#063970" }}>
      <Toolbar>
        {isMatch ? (
          <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                {" "}
                Techshop
              </Link>
            </Typography>
            {user && (
              <Link
                style={{
                  color: "yellow",
                  fontSize: "0.7rem",
                  marginRight: "1%",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  cursor: "none",
                }}
                to={"/profile"}
              >
                <Person sx={{ fontSize: "1.2rem", mr: "2px" }} />
                {name}
              </Link>
            )}
            <ShoppingCart
              sx={{ fontSize: "1.5rem", mr: "25px", cursor: "pointer" }}
              onClick={handleCartClick}
            />
            <DrawerComponent />
          </>
        ) : (
          <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                {" "}
                Techshop
              </Link>
            </Typography>
            {user && (
              <Link
                style={{
                  color: "yellow",
                  // width: "25%",
                  fontSize: "0.8rem",
                  marginRight: "25px",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
                to={"/profile"}
              >
                <Person sx={{ fontSize: "1.2rem", mr: "1px" }} /> {name}
              </Link>
            )}

            <ShoppingCart
              sx={{ fontSize: "1.5rem", mr: "25px", cursor: "pointer" }}
              onClick={handleCartClick}
            />

            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
              indicatorColor="secondary"
            >
              {PAGES.map((page) => (
                <Tab
                  key={page.path}
                  label={page.label}
                  value={page.path}
                  component={Link}
                  to={page.path}
                />
              ))}
            </Tabs>
          </>
        )}
        <LogoutOutlined
          sx={{ color: "white", cursor: "pointer" }}
          onClick={handleLogout}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
