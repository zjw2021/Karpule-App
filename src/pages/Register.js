import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/users/userContext";
import "../styles/components.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Register = () => {
  const userContext = useContext(UserContext);
  const { registerUser, isAuth } = userContext;

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
    profile: "",
  });
  const { email } = user;

  // Check if email is a babson email
  const emailAddress = email.substring(email.length - 10, email.length);

  const clearForm = () => {
    setUser({
      email: "",
      password: "",
      profile: "",
      carModel: "",
      carPlate: "",
      carColor: "",
      firstName: "",
      lastName: "",
    });
  };

  const register = (e) => {
    e.preventDefault();
    if (emailAddress !== "babson.edu") {
      setShowSnackbar(true);
      setSnackbarMessage(
        "Invalid email: please register with your Babson email"
      );
      return;
    }
    registerUser(user);
    clearForm();
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container sx={{ height: "100%", width: "80%" }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height="100%"
      >
        <Box marginBottom="5vh">
          <Typography variant="h3" fontWeight="bold">
            Karpule
          </Typography>
          <Typography>Create new account</Typography>
        </Box>
        <FormControl sx={{ width: "100%", marginBottom: "3vh" }}>
          <TextField
            size="small"
            name="firstName"
            label="First Name"
            onChange={onChange}
            sx={{ marginBottom: "2vh" }}
          />
          <TextField
            size="small"
            name="lastName"
            label="Last Name"
            onChange={onChange}
            sx={{ marginBottom: "2vh" }}
          />
          <TextField
            size="small"
            name="email"
            label="Email"
            onChange={onChange}
            sx={{ marginBottom: "2vh" }}
          />
          <TextField
            size="small"
            name="password"
            label="Password"
            type="password"
            onChange={onChange}
          />

          <Typography
            fontWeight="bold"
            variant="h6"
            marginTop="4vh"
            marginBottom="2vh"
          >
            Drive with Karpule (optional)
          </Typography>

          <TextField
            size="small"
            name="carModel"
            label="Car model"
            onChange={onChange}
            sx={{ marginBottom: "2vh" }}
          />
          <TextField
            size="small"
            name="carColor"
            label="Car color"
            onChange={onChange}
            sx={{ marginBottom: "2vh" }}
          />
          <TextField
            size="small"
            name="carPlate"
            label="License plate"
            onChange={onChange}
            sx={{ marginBottom: "2vh" }}
          />
          <Button variant="contained" color="primary" onClick={register}>
            Register
          </Button>
        </FormControl>

        <Link to="/login">Already have an account?</Link>
      </Box>
      <Snackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={10000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {isAuth && <Navigate to="/" />}
    </Container>
  );
};

export default Register;
