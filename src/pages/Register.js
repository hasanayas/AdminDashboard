import React, { useState } from "react";
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
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import firebaseConfig from "../config";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//Şifreleme için gerekli
const CryptoJS = require("crypto-js");
const secretKey = "password";

const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  //Firebase
  let [nickname, setNickname] = useState("");
  let [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordAgain, setPasswordAgain] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [errorFields, setErrorFields] = useState([]);

  // AES şifreleme fonksiyonu
  const Encrypt = (text) => {
    try {
      const encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString();
      return encryptedText;
    } catch (error) {
      console.error("Şifreleme hatası:", error.message);
      return null;
    }
  };

  // Parola iconlarını açıp-kapatma
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePasswordVisibilityAgain = () => {
    setShowPasswordAgain(!showPasswordAgain);
  };

  // Kontrollü kullanıcı kayıt etme
  const createUser = async () => {
    //Boş bırakılan alanları kırmızı yapar
    if (!nickname || !password || !passwordAgain || !email) {
      setErrorFields((prevState) =>
        prevState.filter((field) => field !== "nickname")
      );
      setErrorFields((prevState) =>
        prevState.filter((field) => field !== "password")
      );
      setErrorFields((prevState) =>
        prevState.filter((field) => field !== "passwordAgain")
      );
      setErrorFields((prevState) =>
        prevState.filter((field) => field !== "email")
      );

      if (!nickname) setErrorFields((prevState) => [...prevState, "nickname"]);
      if (!password) setErrorFields((prevState) => [...prevState, "password"]);
      if (!passwordAgain)
        setErrorFields((prevState) => [...prevState, "passwordAgain"]);
      if (!email) setErrorFields((prevState) => [...prevState, "email"]);

      alert("Boş bırakılan alan olamaz");
      return;
    } else if (password !== passwordAgain) {
      alert("Parolar uyuşmuyor");
    } else if (!validateEmail(email)) {
      alert("Geçerli bir email adresi girin");
    } else if (password.length <= 6 || password.length >= 20) {
      alert("Parolanız en az 6 en fazla 20 karakter olabilir.");
    } else {
      try {
        const encryptedPassword = Encrypt(password);
        nickname = nickname.toLowerCase();
        email = email.toLowerCase();

        const adminUser = {
          nickname,
          email,
          password: encryptedPassword,
        };

        db.collection("admins")
          .doc(nickname)
          .set(adminUser)
          .then(() => {})
          .catch((error) => {
            alert("Firestore kayıt hatası: " + error.message);
          });

        alert("Kayıt işlemi başarılı");
        clearInputs();
      } catch (error) {
        alert(error + " sebepli hata meydana geldi");
      }
    }
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
      case "passwordAgain":
        setPasswordAgain(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      default:
        break;
    }
  };

  // Email Regex
  const validateEmail = (email) => {
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    return emailPattern.test(email);
  };

  // Alanları temizler
  const clearInputs = () => {
    setNickname("");
    setPassword("");
    setEmail("");
    setPasswordAgain("");
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid //For Photo
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
            <PersonAddAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Register Page
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => handleInputChange(event, "email")}
              error={errorFields.includes("email")}
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
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </span>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordAgain"
              label="Password Again"
              type={showPasswordAgain ? "text" : "password"}
              id="passwordAgain"
              autoComplete="current-passwordAgain"
              value={passwordAgain}
              onChange={(event) => handleInputChange(event, "passwordAgain")}
              error={errorFields.includes("passwordAgain")}
              InputProps={{
                endAdornment: (
                  <span
                    onClick={handleTogglePasswordVisibilityAgain}
                    style={{ cursor: "pointer" }}
                  >
                    {showPasswordAgain ? (
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
              onClick={createUser}
            >
              Register
            </Button>
              <Link href="/" variant="body2">
                Sign In
              </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
