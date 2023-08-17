import React, { useState } from "react";
import "../App.css";
import Sidebar from "./Sidebar";
import Analytics from "./Analytics";
import Card from "./Card";
import Users from "./Users";
import UserActions from "./UserActions";
import Kanban from "./Kanban";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import firebaseConfig from "../config";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//Şifre çözmek için gerekli
const CryptoJS = require("crypto-js");
const secretKey = "password";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginUser();
  };

  const [errorFields, setErrorFields] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("Users");
  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  // Firebase
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // AES şifre çözme fonksiyonu
  const Decrypt = (encryptedText) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedText;
    } catch (error) {
      console.error("Çözme hatası:", error.message);
      return null;
    }
  };


  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event, fieldName) => {
    if (errorFields.includes(fieldName)) {
      setErrorFields((prevState) =>
        prevState.filter((field) => field !== fieldName)
      );
    }

    switch (fieldName) {
      case "nickname":
        setNickname(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const loginUser = async () => {
    try {
      if (!nickname || !password) {
        setErrorFields((prevState) =>
          prevState.filter((field) => field !== "nickname")
        );
        setErrorFields((prevState) =>
          prevState.filter((field) => field !== "password")
        );

        if (!nickname)
          setErrorFields((prevState) => [...prevState, "nickname"]);
        if (!password)
          setErrorFields((prevState) => [...prevState, "password"]);

        alert("Tüm alanları doldurun");
        return;
      } else {
        const doc = await db
          .collection("admins")
          .doc(nickname.toLowerCase())
          .get();
        if (doc.exists) {
          const adminUser = doc.data();
          const decryptedPassword = Decrypt(adminUser.password);

          if (password === decryptedPassword) {
            alert("Giriş başarılı");
            clearInputs();
            setLoggedIn(true);
          } else {
            alert("Yanlış şifre, tekrar deneyiniz");
          }
        } else {
          alert("Kullanıcı bulunamadı");
        }
      }
    } catch (error) {
      alert("Oturum açma sırasında bir hata oluştu: " + error.message);
    }
  };

  const clearInputs = () => {
    setNickname("");
    setPassword("");
  };

  return (
    <div>
      {loggedIn ? (
        <div className="App">
          <Sidebar activePage={activePage} onPageChange={handlePageChange} />
          <div className="content">
            {activePage === "Analytics" && <Analytics />}
            {activePage === "Card" && <Card />}
            {activePage === "Users" && <Users />}
            {activePage === "UserActions" && <UserActions />}
            {activePage === "Kanban" && <Kanban />}
          </div>
        </div>
      ) : (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid //For Photo
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 2, bgcolor: "#1976d2" }}>
                <PersonIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
              Admin Login Page
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nickname"
                  label="Nickname"
                  name="nickname"
                  autoComplete="nickname"
                  autoFocus
                  value={nickname}
                  onChange={(event) => handleInputChange(event, "nickname")}
                  error={errorFields.includes("nickname")}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => handleInputChange(event, "password")}
                  error={errorFields.includes("password")}
                  InputProps={{
                    endAdornment: (
                      <span
                        onClick={handleTogglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </span>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                   Login 
                </Button>
                <div
                  className="custom-container"
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  Don't have an account?
                  <Link href="/register" style={{ marginLeft: 10 }}>
                    Sign Up
                  </Link>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Login;
