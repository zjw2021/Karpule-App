import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/users/userContext";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useSearchParams } from "react-router-dom";

const Login = () => {
  const userContext = useContext(UserContext);
  const { loginUser, isAuth, setStripeCodeAndState } = userContext;

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    try {
      await loginUser(user);
    } catch (e) {
      setShowSnackbar(true);
      setSnackbarMessage(`Failed to login: ${e.message}`);
    }
  };

  const keyDown = (e) => {
    // Run login if enter is pressed
    if (e.keyCode === 13) {
      login(e);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [searchParams] = useSearchParams();
  useEffect(async () => {
    // Check if there are searchParams
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (code != null && state != null) {
      setStripeCodeAndState(code, state);
    }
  }, []);

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
          <Typography>A ride sharing platform</Typography>
        </Box>
        <FormControl sx={{ width: "100%", marginBottom: "3vh" }}>
          <TextField
            name="email"
            label="Email"
            onChange={onChange}
            onKeyDown={keyDown}
            sx={{ marginBottom: "3vh" }}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            onChange={onChange}
            onKeyDown={keyDown}
            sx={{ marginBottom: "3vh" }}
          />
          <Button variant="contained" color="primary" onClick={login}>
            Login
          </Button>
        </FormControl>

        <Link
          to="/register"
          sx={{
            color: "black",
            textDecoration: "none",
          }}
        >
          Create new account
        </Link>
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

export default Login;
