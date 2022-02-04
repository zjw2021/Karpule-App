import React, { useContext } from "react";
import { Navigate } from "react-router";
import UserContext from "../../context/users/userContext";
import Footer from "../Footer";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

const Layout = (props) => {
  const userContext = useContext(UserContext);
  const { isAuth, isDriver } = userContext;
  return (
    <>
      <Container>
        {props.children}
        {isDriver ? <Footer /> : null}
        {!isAuth && <Navigate to="/login" />}
      </Container>
      <CssBaseline />
    </>
  );
};
export default Layout;
