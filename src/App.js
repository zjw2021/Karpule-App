import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import UserState from "./context/users/UserState";
import RideState from "./context/ride/RideState";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import RegisterCompletePage from "./pages/RegisterComplete";

import HomePage from "./pages/Home";
import DrivePage from "./pages/Drive";
import PurchaseSuccess from "./pages/PurchaseSuccess";

import UserContext from "./context/users/userContext";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0bc743",
    },
  },
});

function BrowserRoutes() {
  const userContext = useContext(UserContext);
  const { isAuth, isDriver, loginUserWithToken } = userContext;

  if (!isAuth) {
    // Check for authentication token
    const token = localStorage.getItem("token");
    if (token && token !== "undefined") {
      loginUserWithToken(token);
    }
  }

  return (
    <Routes>
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/register" element={<RegisterPage />} />

      <Route exact path="/" element={<HomePage />} />
      <Route
        exact
        path="/drive"
        element={isDriver ? <DrivePage /> : <Navigate to="/" />}
      />
      <Route
        exact
        path="/registercomplete"
        element={<RegisterCompletePage />}
      />
      <Route exact path="/purchasesuccess" element={<PurchaseSuccess />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <UserState>
          <RideState>
            <BrowserRoutes />
          </RideState>
        </UserState>
      </Router>
    </ThemeProvider>
  );
}

export default App;
